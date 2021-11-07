import copy

import numpy as np
from sklearn.linear_model import LogisticRegression

from federatedml.model_base import ModelBase
from federatedml.param.local_baseline_param import LocalBaselineParam
from federatedml.protobuf.generated import lr_model_meta_pb2, lr_model_param_pb2
from federatedml.statistic import data_overview
from federatedml.util import LOGGER
from federatedml.util import abnormal_detection
from federatedml.util.io_check import assert_io_num_rows_equal


class LocalBaseline(ModelBase):
    def __init__(self):
        super(LocalBaseline, self).__init__()
        self.model_param = LocalBaselineParam()
        self.model_name = "LocalBaseline"
        self.metric_type = ""
        self.model_param_name = "LocalBaselineParam"
        self.model_meta_name = "LocalBaselineMeta"

        # one_ve_rest parameter
        self.need_one_vs_rest = None
        self.one_vs_rest_classes = []
        self.one_vs_rest_obj = None

    def _init_model(self, params):
        self.model_name = params.model_name
        self.model_opts = params.model_opts
        self.predict_param = params.predict_param
        self.model = None
        self.model_fit = None
        self.header = None
        self.model_weights = None

    def get_model(self):
        # extend in future with more model types
        model = LogisticRegression(**self.model_opts)
        self.model = copy.deepcopy(model)
        return model

    def _get_model_param(self):
        model = self.model_fit
        n_iter = int(model.n_iter_[0])
        is_converged = bool(n_iter < model.max_iter)

        coef = model.coef_[0]
        #LOGGER.debug(f"model coef len {coef.shape[0]}, value: {coef}")
        weight_dict = dict(zip(self.header, [float(i) for i in coef]))
        #LOGGER.debug(f"model weight dict {weight_dict}")
        # intercept is in array format if fit_intercept
        intercept = model.intercept_[0] if model.fit_intercept else model.intercept_

        result = {'iters': n_iter,
                  'is_converged': is_converged,
                  'weight': weight_dict,
                  'intercept': intercept,
                  'header': self.header,
                  'best_iteration': -1
                  }
        return result

    def _get_model_param_ovr(self):
        model = self.model_fit
        n_iter = int(model.n_iter_[0])
        is_converged = bool(n_iter < model.max_iter)
        classes = model.classes_
        coef_all = model.coef_
        intercept_all = model.intercept_
        ovr_pb_objs = []
        ovr_pb_classes = []

        for i, label in enumerate(classes):
            coef = coef_all[i,]
            weight_dict = dict(zip(self.header, list(coef)))
            intercept = intercept_all[i] if model.fit_intercept else intercept_all
            result = {'iters': n_iter,
                      'is_converged': is_converged,
                      'weight': weight_dict,
                      'intercept': intercept,
                      'header': self.header,
                      'best_iteration': -1
                      }
            param_protobuf_obj = lr_model_param_pb2.SingleModel(**result)
            ovr_pb_objs.append(param_protobuf_obj)
            ovr_pb_classes.append(str(label))

        one_vs_rest_result = {
            'completed_models': ovr_pb_objs,
            'one_vs_rest_classes': ovr_pb_classes
        }
        param_result = {'one_vs_rest_result': one_vs_rest_result,
                        'need_one_vs_rest': True,
                        'header': self.header}
        return param_result

    def _get_param(self):
        header = self.header
        #LOGGER.debug("In get_param, header: {}".format(header))
        if header is None:
            param_protobuf_obj = lr_model_param_pb2.LRModelParam()
            return param_protobuf_obj
        if self.need_one_vs_rest:
            result = self._get_model_param_ovr()
            param_protobuf_obj = lr_model_param_pb2.LRModelParam(**result)

        else:
            result = self._get_model_param()
            param_protobuf_obj = lr_model_param_pb2.LRModelParam(**result)

        #LOGGER.debug("in _get_param, result: {}".format(result))

        return param_protobuf_obj

    def _get_meta(self):
        model = self.model_fit
        predict_param = lr_model_meta_pb2.PredictMeta(**{"threshold": self.predict_param.threshold})
        result = {'penalty': model.penalty,
                  'tol': model.tol,
                  'fit_intercept': model.fit_intercept,
                  'optimizer': model.solver,
                  'need_one_vs_rest': self.need_one_vs_rest,
                  'max_iter': model.max_iter,
                  'predict_param': predict_param
                  }
        meta_protobuf_obj = lr_model_meta_pb2.LRModelMeta(**result)

        return meta_protobuf_obj

    def export_model(self):
        if not self.need_run:
            return
        meta_obj = self._get_meta()
        param_obj = self._get_param()
        result = {
            self.model_meta_name: meta_obj,
            self.model_param_name: param_obj
        }
        return result

    def get_model_summary(self):
        header = self.header
        if header is None:
            return {}
        if not self.need_one_vs_rest:
            param = self._get_model_param()
            summary = {
                'coef': param['weight'],
                'intercept': param['intercept'],
                'is_converged': param['is_converged'],
                'iters': param['iters'],
                'one_vs_rest': False
            }
        else:
            model = self.model_fit
            n_iter = int(model.n_iter_[0])
            is_converged = bool(n_iter < model.max_iter)
            classes = model.classes_
            coef_all = model.coef_
            intercept_all = model.intercept_
            summary = {}

            for i, label in enumerate(classes):
                coef = coef_all[i,]
                weight_dict = dict(zip(self.header, [float(i) for i in coef]))
                intercept = float(intercept_all[i]) if model.fit_intercept else float(intercept_all)
                single_summary = {
                    'coef': weight_dict,
                    'intercept': intercept,
                    'is_converged': is_converged,
                    'iters': n_iter
                    }
                single_key = f"{label}"
                summary[single_key] = single_summary
                summary['one_vs_rest'] = True
        return summary

    @assert_io_num_rows_equal
    def _load_single_coef(self, result_obj):
        feature_shape = len(self.header)
        tmp_vars = np.zeros(feature_shape)
        weight_dict = dict(result_obj.weight)
        for idx, header_name in enumerate(self.header):
            tmp_vars[idx] = weight_dict.get(header_name)
        return tmp_vars

    def _load_single_model(self, result_obj):
        coef = self._load_single_coef(result_obj)
        self.model_fit.__setattr__('coef_', np.array([coef]))
        self.model_fit.__setattr__('intercept_', np.array([result_obj.intercept]))
        self.model_fit.__setattr__('classes_', np.array([0, 1]))
        self.model_fit.__setattr__('n_iter_', [result_obj.iters])
        return

    def _load_ovr_model(self, result_obj):
        one_vs_rest_result = result_obj.one_vs_rest_result
        classes = np.array([int(i) for i in one_vs_rest_result.one_vs_rest_classes])
        models = one_vs_rest_result.completed_models

        class_count, feature_shape = len(classes), len(self.header)
        coef_all = np.zeros((class_count, feature_shape))
        intercept_all = np.zeros(class_count)
        iters = -1

        for i, label in enumerate(classes):
            model = models[i]
            coef = self._load_single_coef(model)
            coef_all[i,] = coef
            intercept_all[i] = model.intercept
            iters = model.iters

        self.model_fit.__setattr__('coef_', coef_all)
        self.model_fit.__setattr__('intercept_', intercept_all)
        self.model_fit.__setattr__('classes_', classes)
        self.model_fit.__setattr__('n_iter_', [iters])
        return

    def _load_model_meta(self, meta_obj):
        self.model_fit.__setattr__('penalty', meta_obj.penalty)
        self.model_fit.__setattr__('tol', meta_obj.tol)
        self.model_fit.__setattr__('fit_intercept', meta_obj.fit_intercept)
        self.model_fit.__setattr__('solver', meta_obj.optimizer)
        self.model_fit.__setattr__('max_iter', meta_obj.max_iter)

    def load_model(self, model_dict):
        result_obj = list(model_dict.get('model').values())[0].get(self.model_param_name)
        meta_obj = list(model_dict.get('model').values())[0].get(self.model_meta_name)
        self.model_fit = LogisticRegression()
        self._load_model_meta(meta_obj)
        self.header = list(result_obj.header)

        self.need_one_vs_rest = meta_obj.need_one_vs_rest
        LOGGER.debug("in _load_model need_one_vs_rest: {}".format(self.need_one_vs_rest))
        if self.need_one_vs_rest:
            self._load_ovr_model(result_obj)
        else:
            self._load_single_model(result_obj)
        return

    @assert_io_num_rows_equal
    def predict(self, data_instances):
        if not self.need_run:
            return
        model_fit = self.model_fit
        classes = [int(x) for x in model_fit.classes_]
        if self.need_one_vs_rest:
            pred_prob = data_instances.mapValues(lambda v: model_fit.predict_proba(v.features[None, :])[0])

        else:
            pred_prob = data_instances.mapValues(lambda v: model_fit.predict_proba(v.features[None, :])[0][1])
        predict_result = self.predict_score_to_output(data_instances=data_instances, predict_score=pred_prob,
                                                      classes=classes, threshold=self.predict_param.threshold)
        return predict_result

    def fit(self, data_instances, validate_data=None):
        if not self.need_run:
            return
        # check if empty table
        LOGGER.info("Enter Local Baseline fit")
        abnormal_detection.empty_table_detection(data_instances)
        abnormal_detection.empty_feature_detection(data_instances)
        # get model
        model = self.get_model()
        # get header
        self.header = data_overview.get_header(data_instances)

        X_table = data_instances.mapValues(lambda v: v.features)
        y_table = data_instances.mapValues(lambda v: v.label)

        X = np.array([v[1] for v in list(X_table.collect())])
        y = np.array([v[1] for v in list(y_table.collect())])

        w = None
        if data_overview.with_weight(data_instances):
            LOGGER.info(f"Input Data with Weight. Weight will be used to fit model.")
            weight_table = data_instances.mapValues(lambda v: v.weight)
            w = np.array([v[1] for v in list(weight_table.collect())])

        self.model_fit = model.fit(X, y, w)
        self.need_one_vs_rest = len(self.model_fit.classes_) > 2
        self.set_summary(self.get_model_summary())

    def access_server(method, ctx, postfix, json_data=None, echo=True, **kwargs):
        if ctx.obj.get('init', False):
            try:
                url = "/".join([ctx.obj['server_url'], postfix])
                response = {}
                if method == 'get':
                    response = requests.get(url=url, json=json_data, **kwargs)
                elif method == 'post':
                    response = requests.post(url=url, json=json_data, **kwargs)
                if echo:
                    prettify(response)
                    return
                else:
                    return response

    class Clients(object):
        def __init__(self, config: Config):
            self._flow_clients = {}
            self._tunnel_id_to_flow_clients = {}
            self._role_str_to_service_id = {}
            self._tunnel_id_to_tunnel = config.tunnel_id_to_tunnel

            for service_id, service in config.service_id_to_service.items():
                if isinstance(service, Config.service):
                    self._flow_clients[service_id] = FLOWClient(service.address, config.data_base_dir,
                                                                config.cache_directory)

                elif isinstance(service, Config.tunnel_service):
                    self._flow_clients[service_id] = FLOWClient(None, config.data_base_dir, config.cache_directory)
                    self._tunnel_id_to_flow_clients.setdefault(service.tunnel_id, []).append(
                        (service.index, self._flow_clients[service_id]))

            for party, service_id in config.party_to_service_id.items():
                for role_str in config.parties.party_to_role_string(party):
                    self._role_str_to_service_id[role_str] = service_id

        def __getitem__(self, role_str: str) -> 'FLOWClient':
            if role_str not in self._role_str_to_service_id:
                raise RuntimeError(f"no flow client found binding to {role_str}")
            return self._flow_clients[self._role_str_to_service_id[role_str]]

        def __enter__(self):
            # open ssh tunnels and create flow clients for remote
            self._tunnels = []
            for tunnel_id, tunnel_conf in self._tunnel_id_to_tunnel.items():
                tunnel = sshtunnel.SSHTunnelForwarder(ssh_address_or_host=tunnel_conf.ssh_address,
                                                      ssh_username=tunnel_conf.ssh_username,
                                                      ssh_password=tunnel_conf.ssh_password,
                                                      ssh_pkey=tunnel_conf.ssh_priv_key,
                                                      remote_bind_addresses=tunnel_conf.services_address)
                tunnel.start()
                self._tunnels.append(tunnel)
                for index, flow_client in self._tunnel_id_to_flow_clients[tunnel_id]:
                    flow_client.set_address(f"127.0.0.1:{tunnel.local_bind_ports[index]}")
            return self

        def __exit__(self, exc_type, exc_val, exc_tb):
            for tunnel in self._tunnels:
                try:
                    tunnel.stop()
                except Exception as e:
                    LOGGER.exception(e)

        def contains(self, role_str):
            return role_str in self._role_str_to_service_id

        def all_roles(self):
            return sorted(self._role_str_to_service_id.keys())


if __name__ == '__main__':
    pipeline_upload.add_upload_data(file=os.path.join(DATA_BASE, "examples/data/breast_hetero_guest.csv"),
                                    table_name=dense_data["name"],             # table name
                                    namespace=dense_data["namespace"],         # namespace
                                    head=1, partition=partition)               # data info
    pipeline_upload.upload(work_mode=work_mode, backend=backend, drop=1)

    def get_dict_from_file(file_name):
        with open(file_name, 'r', encoding='utf-8') as f:
            json_info = json.load(f)
        return json_info


    class Base(object):
        def __init__(self, server_url, component_name):
            self.config = None
            self.dsl = None
            self.guest_party_id = None
            self.host_party_id = None
            self.job_id = None
            self.model_id = None
            self.model_version = None
            self.server_url = server_url
            self.component_name = component_name

        def set_config(self, guest_party_id, host_party_id, arbiter_party_id, path, work_mode):
            self.config = get_dict_from_file(path)
            self.config["initiator"]["party_id"] = guest_party_id[0]
            self.config["role"]["guest"] = guest_party_id
            self.config["role"]["host"] = host_party_id
            if self.config["job_parameters"].get("common"):
                self.config["job_parameters"]["common"]["work_mode"] = work_mode
            else:
                self.config["job_parameters"]["work_mode"] = work_mode
            if "arbiter" in self.config["role"]:
                self.config["role"]["arbiter"] = arbiter_party_id
            self.guest_party_id = guest_party_id
            self.host_party_id = host_party_id
            return self.config

        def set_dsl(self, path):
            self.dsl = get_dict_from_file(path)
            return self.dsl

        def submit(self):
            post_data = {'job_runtime_conf': self.config, 'job_dsl': self.dsl}
            print(f"start submit job, data:{post_data}")
            response = requests.post("/".join([self.server_url, "job", "submit"]), json=post_data)
            if response.status_code == 200 and not response.json().get('retcode'):
                self.job_id = response.json().get("jobId")
                print(f"submit job success: {response.json()}")
                self.model_id = response.json().get("data").get("model_info").get("model_id")
                self.model_version = response.json().get("data").get("model_info").get("model_version")
                return True
            else:
                print(f"submit job failed: {response.text}")
                return False

        def query_job(self):
            post_data = {'job_id': self.job_id}
            response = requests.post("/".join([self.server_url, "job", "query"]), json=post_data)
            if response.status_code == 200:
                if response.json().get("data"):
                    return response.json().get("data")[0].get("f_status")
            return False

        def wait_success(self, timeout=60 * 10):
            for i in range(timeout // 10):
                time.sleep(10)
                status = self.query_job()
                print("job {} status is {}".format(self.job_id, status))
                if status and status == "success":
                    return True
                if status and status in ["canceled", "timeout", "failed"]:
                    return False
            return False

        def get_component_output_data(self, output_path=None):
            post_data = {
                "job_id": self.job_id,
                "role": "guest",
                "party_id": self.guest_party_id[0],
                "component_name": self.component_name
            }
            if not output_path:
                output_path = './output/data'
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            tar_file_name = 'job_{}_{}_{}_{}_output_data.tar.gz'.format(post_data['job_id'],
                                                                        post_data['component_name'],
                                                                        post_data['role'], post_data['party_id'])
            extract_dir = os.path.join(output_path, tar_file_name.replace('.tar.gz', ''))
            print("start get component output dat")

            with closing(
                    requests.get("/".join([self.server_url, "tracking", "component/output/data/download"]),
                                 json=post_data,
                                 stream=True)) as response:
                if response.status_code == 200:
                    try:
                        download_from_request(http_response=response, tar_file_name=tar_file_name,
                                              extract_dir=extract_dir)
                        print(f'get component output path {extract_dir}')
                    except:
                        print(f"get component output data failed")
                        return False

        def get_output_data_table(self):
            post_data = {
                "job_id": self.job_id,
                "role": "guest",
                "party_id": self.guest_party_id[0],
                "component_name": self.component_name
            }
            response = requests.post("/".join([self.server_url, "tracking", "component/output/data/table"]),
                                     json=post_data)
            result = {}
            try:
                if response.status_code == 200:
                    result["name"] = response.json().get("data")[0].get("table_name")
                    result["namespace"] = response.json().get("data")[0].get("namespace")
            except Exception as e:
                raise RuntimeError(f"output data table error: {response}") from e
            return result

        def get_table_info(self, table_name):
            post_data = {
                "name": table_name['name'],
                "namespace": table_name['namespace']
            }
            response = requests.post("/".join([self.server_url, "table", "table_info"]), json=post_data)
            try:
                if response.status_code == 200:
                    table_count = response.json().get("data").get("count")
                else:
                    raise RuntimeError(f"get table info failed: {response}")
            except Exception as e:
                raise RuntimeError(f"get table count error: {response}") from e
            return table_count

        def get_auc(self):
            post_data = {
                "job_id": self.job_id,
                "role": "guest",
                "party_id": self.guest_party_id[0],
                "component_name": "evaluation_0"
            }
            response = requests.post("/".join([self.server_url, "tracking", "component/metric/all"]), json=post_data)
            try:
                if response.status_code == 200:
                    auc = response.json().get("data").get("train").get(self.component_name).get("data")[0][1]
                else:
                    raise RuntimeError(f"get metrics failed: {response}")
            except Exception as e:
                raise RuntimeError(f"get table count error: {response}") from e
            return auc


    class TrainLRModel(Base):
        def get_component_metrics(self, metric_output_path, file=None):
            post_data = {
                "job_id": self.job_id,
                "role": "guest",
                "party_id": self.guest_party_id[0],
                "component_name": "evaluation_0"
            }
            response = requests.post("/".join([self.server_url, "tracking", "component/metric/all"]), json=post_data)
            if response.status_code == 200:
                if response.json().get("data"):
                    if not file:
                        file = metric_output_path.format(self.job_id)
                    os.makedirs(os.path.dirname(file), exist_ok=True)
                    with open(file, 'w') as fp:
                        json.dump(response.json().get("data"), fp)
                    print(f"save component metrics success, path is:{os.path.abspath(file)}")
                else:
                    print(f"get component metrics:{response.json()}")
                    return False

        def get_component_output_model(self, model_output_path, file=None):
            post_data = {
                "job_id": self.job_id,
                "role": "guest",
                "party_id": self.guest_party_id[0],
                "component_name": self.component_name
            }
            print(f"request component output model: {post_data}")
            response = requests.post("/".join([self.server_url, "tracking", "component/output/model"]), json=post_data)
            if response.status_code == 200:
                if response.json().get("data"):
                    if not file:
                        file = model_output_path.format(self.job_id)
                    os.makedirs(os.path.dirname(file), exist_ok=True)
                    with open(file, 'w') as fp:
                        json.dump(response.json().get("data"), fp)
                    print(f"save component output model success, path is:{os.path.abspath(file)}")
                else:
                    print(f"get component output model:{response.json()}")
                    return False


    class PredictLRMode(Base):
        def set_predict(self, guest_party_id, host_party_id, arbiter_party_id, model_id, model_version, path,
                        work_mode):
            self.set_config(guest_party_id, host_party_id, arbiter_party_id, path, work_mode)
            if self.config["job_parameters"].get("common"):
                self.config["job_parameters"]["common"]["model_id"] = model_id
                self.config["job_parameters"]["common"]["model_version"] = model_version
            else:
                self.config["job_parameters"]["model_id"] = model_id
                self.config["job_parameters"]["model_version"] = model_version


    def download_from_request(http_response, tar_file_name, extract_dir):
        with open(tar_file_name, 'wb') as fw:
            for chunk in http_response.iter_content(1024):
                if chunk:
                    fw.write(chunk)
        tar = tarfile.open(tar_file_name, "r:gz")
        file_names = tar.getnames()
        for file_name in file_names:
            tar.extract(file_name, extract_dir)
        tar.close()
        os.remove(tar_file_name)


    def train_job(guest_party_id, host_party_id, arbiter_party_id, train_conf_path, train_dsl_path, server_url,
                  work_mode,
                  component_name, metric_output_path, model_output_path, constant_auc):
        train = TrainLRModel(server_url, component_name)
        train.set_config(guest_party_id, host_party_id, arbiter_party_id, train_conf_path, work_mode)
        train.set_dsl(train_dsl_path)
        status = train.submit()
        if status:
            is_success = train.wait_success(timeout=600)
            if is_success:
                train.get_component_metrics(metric_output_path)
                train.get_component_output_model(model_output_path)
                train.get_component_output_data()
                train_auc = train.get_auc()
                assert abs(constant_auc - train_auc) <= 1e-4, 'The training result is wrong, auc: {}'.format(train_auc)
                train_data_count = train.get_table_info(train.get_output_data_table())
                return train, train_data_count
        return False


    def predict_job(guest_party_id, host_party_id, arbiter_party_id, predict_conf_path, predict_dsl_path, model_id,
                    model_version, server_url, work_mode, component_name):
        predict = PredictLRMode(server_url, component_name)
        predict.set_predict(guest_party_id, host_party_id, arbiter_party_id, model_id, model_version, predict_conf_path,
                            work_mode)
        predict.set_dsl(predict_dsl_path)
        status = predict.submit()
        if status:
            is_success = predict.wait_success(timeout=600)
            if is_success:
                predict.get_component_output_data()
                predict_data_count = predict.get_table_info(predict.get_output_data_table())
                return predict, predict_data_count
        return False


    class UtilizeModel:
        def __init__(self, model_id, model_version, server_url):
            self.model_id = model_id
            self.model_version = model_version
            self.deployed_model_version = None
            self.service_id = None
            self.server_url = server_url

        def deploy_model(self):
            post_data = {
                "model_id": self.model_id,
                "model_version": self.model_version
            }
            response = requests.post("/".join([self.server_url, "model", "deploy"]), json=post_data)
            print(f'Request data of deploy model request: {json.dumps(post_data, indent=4)}')
            if response.status_code == 200:
                resp_data = response.json()
                print(f'Response of model deploy request: {json.dumps(resp_data, indent=4)}')
                if resp_data.get("retcode", 100) == 0:
                    self.deployed_model_version = resp_data.get("data", {}).get("model_version")
                else:
                    raise Exception(f"Model {self.model_id} {self.model_version} deploy failed, "
                                    f"details: {resp_data.get('retmsg')}")
            else:
                raise Exception(f"Request model deploy api failed, status code: {response.status_code}")

        def load_model(self):
            post_data = {
                "job_id": self.deployed_model_version
            }
            response = requests.post("/".join([self.server_url, "model", "load"]), json=post_data)
            print(f'Request data of load model request: {json.dumps(post_data, indent=4)}')
            if response.status_code == 200:
                resp_data = response.json()
                print(f'Response of load model request: {json.dumps(resp_data, indent=4)}')
                if not resp_data.get('retcode'):
                    return True
                raise Exception(f"Load model {self.model_id} {self.deployed_model_version} failed, "
                                f"details: {resp_data.get('retmsg')}")
            raise Exception(f"Request model load api failed, status code: {response.status_code}")

        def bind_model(self):
            post_data = {
                "job_id": self.deployed_model_version,
                "service_id": f"auto_test_{datetime.strftime(datetime.now(), '%Y%m%d%H%M%S')}"
            }
            response = requests.post("/".join([self.server_url, "model", "bind"]), json=post_data)
            print(f'Request data of bind model request: {json.dumps(post_data, indent=4)}')
            if response.status_code == 200:
                resp_data = response.json()
                print(f'Response data of bind model request: {json.dumps(resp_data, indent=4)}')
                if not resp_data.get('retcode'):
                    self.service_id = post_data.get('service_id')
                    return True
                raise Exception(f"Bind model {self.model_id} {self.deployed_model_version} failed, "
                                f"details: {resp_data.get('retmsg')}")
            raise Exception(f"Request model bind api failed, status code: {response.status_code}")

        def online_predict(self, online_serving):
            serving_url = f"http://{online_serving}/federation/1.0/inference"
            post_data = {
                "head": {
                    "serviceId": self.service_id
                },
                "body": {
                    "featureData": {
                        "phone_num": "18576635456",
                    },
                    "sendToRemoteFeatureData": {
                        "device_type": "imei",
                        "phone_num": "18576635456",
                        "encrypt_type": "raw"
                    }
                }
            }
            headers = {"Content-Type": "application/json"}
            response = requests.post(serving_url, json=post_data, headers=headers)
            print(f"Request data of online predict request: {json.dumps(post_data, indent=4)}")
            if response.status_code == 200:
                print(f"Online predict successfully, response: {json.dumps(response.json(), indent=4)}")
            else:
                print(f"Online predict successfully, details: {response.text}")


    def run_fate_flow_test(config_json):
        guest_party_id = config_json['guest_party_id']
        host_party_id = config_json['host_party_id']
        arbiter_party_id = config_json['arbiter_party_id']
        train_conf_path = config_json['train_conf_path']
        train_dsl_path = config_json['train_dsl_path']
        server_url = config_json['server_url']
        online_serving = config_json['online_serving']
        work_mode = config_json['work_mode']
        constant_auc = config_json['train_auc']
        component_name = config_json['component_name']
        metric_output_path = config_json['metric_output_path']
        model_output_path = config_json['model_output_path']
        print('submit train job')
        # train
        train, train_count = train_job(guest_party_id, host_party_id, arbiter_party_id, train_conf_path, train_dsl_path,
                                       server_url, work_mode, component_name, metric_output_path, model_output_path,
                                       constant_auc)
        if not train:
            print('train job run failed')
            return False
        print('train job success')

        # deploy
        print('start deploy model')
        utilize = UtilizeModel(train.model_id, train.model_version, server_url)
        utilize.deploy_model()
        print('deploy model success')

        # predict
        predict_conf_path = config_json['predict_conf_path']
        predict_dsl_path = config_json['predict_dsl_path']
        model_id = train.model_id
        model_version = utilize.deployed_model_version
        print('start submit predict job')
        predict, predict_count = predict_job(guest_party_id, host_party_id, arbiter_party_id, predict_conf_path,
                                             predict_dsl_path, model_id, model_version, server_url, work_mode,
                                             component_name)
        if not predict:
            print('predict job run failed')
            return False
        if train_count != predict_count:
            print('Loss of forecast data')
            return False
        print('predict job success')

        # load model
        utilize.load_model()

        # bind model
        utilize.bind_model()

        # online predict
        utilize.online_predict(online_serving=online_serving)


