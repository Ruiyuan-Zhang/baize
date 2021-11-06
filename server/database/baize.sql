/*
 Navicat Premium Data Transfer

 Source Server         : mysql5.6
 Source Server Type    : MySQL
 Source Server Version : 80025
 Source Host           : localhost:3306
 Source Schema         : baize

 Target Server Type    : MySQL
 Target Server Version : 80025
 File Encoding         : 65001

 Date: 07/11/2021 02:20:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_auth_casbin_rule
-- ----------------------------
DROP TABLE IF EXISTS `tb_auth_casbin_rule`;
CREATE TABLE `tb_auth_casbin_rule`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `ptype` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `v0` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `v1` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `v2` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '*',
  `v3` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `v4` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `v5` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_index`(`ptype`, `v0`, `v1`, `v2`, `v3`, `v4`, `v5`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_auth_casbin_rule
-- ----------------------------

-- ----------------------------
-- Table structure for tb_category
-- ----------------------------
DROP TABLE IF EXISTS `tb_category`;
CREATE TABLE `tb_category`  (
  `id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类编号',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '联邦学习分类名称',
  `description` varchar(3000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '分类介绍',
  `file` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '封面图片地址',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_category
-- ----------------------------
INSERT INTO `tb_category` VALUES ('1', '机器学习', '机器学习是一门多领域交叉学科，涉及概率论、统计学、逼近论、凸分析、算法复杂度理论等多门学科。专门研究计算机怎样模拟或实现人类的学习行为，以获取新的知识或技能，重新组织已有的知识结构使之不断改善自身的性能。', '/images/category/1.webp', '2021-08-09 23:32:42', '2021-08-09 23:32:42');
INSERT INTO `tb_category` VALUES ('2', '计算机视觉', '计算机视觉是一门研究如何使机器“看”的科学，更进一步的说，就是是指用摄影机和电脑代替人眼对目标进行识别、跟踪和测量等机器视觉，并进一步做图形处理，使电脑处理成为更适合人眼观察或传送给仪器检测的图像。作为一个科学学科，计算机视觉研究相关的理论和技术，试图建立能够从图像或者多维数据中获取‘信息’的人工智能系统。这里所 指的信息指Shannon定义的，可以用来帮助做一个“决定”的信息。因为感知可以看作是从感官信号中提 取信息，所以计算机视觉也可以看作是研究如何使人工系统从图像或多维数据中“感知”的科学。', '/images/category/2.webp', '2021-08-09 23:32:42', '2021-08-09 23:32:42');
INSERT INTO `tb_category` VALUES ('3', '语音识别', '语音识别是一门交叉学科。近二十年来，语音识别技术取得显著进步，开始从实验室走向市场。人们预计，未来10年内，语音识别技术将进入工业、家电、通信、汽车电子、医疗、家庭服务、消费电子产品等各个领域。 语音识别听写机在一些领域的应用被美国新闻界评为1997年计算机发展十件大事之一。很多专家都认为语音识别技术是3000年至3010年间信息技术领域十大重要的科技发展技术之一。 语音识别技术所涉及的领域包括：信号处理、模式识别、概率论和信息论、发声机理和听觉机理、人工智能等等。', '/images/category/3.webp', '2021-08-09 23:32:42', '2021-08-09 23:32:42');
INSERT INTO `tb_category` VALUES ('4', '自然语言处理', '自然语言处理( Natural Language Processing, NLP)是计算机科学领域与人工智能领域中的一个重要方向。它研究能实现人与计算机之间用自然语言进行有效通信的各种理论和方法。自然语言处理是一门融语言学、计算机科学、数学于一体的科学。因此，这一领域的研究将涉及自然语言，即人们日常使用的语言，所以它与语言学的研究有着密切的联系，但又有重要的区别。自然语言处理并不是一般地研究自然语言，而在于研制能有效地实现自然语言通信的计算机系统，特别是其中的软件系统。因而它是计算机科学的一部分 [2]  。', '/images/category/4.jpeg', '2021-08-09 23:32:42', '2021-08-09 23:32:42');

-- ----------------------------
-- Table structure for tb_client_model
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_model`;
CREATE TABLE `tb_client_model`  (
  `global_model_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '全局模型编号',
  `id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户端模型编号',
  `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户端名称',
  `task_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '任务编号',
  `file` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '全局模型地址',
  `time` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '模型训练消耗的时间',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_client_model
-- ----------------------------

-- ----------------------------
-- Table structure for tb_data_format
-- ----------------------------
DROP TABLE IF EXISTS `tb_data_format`;
CREATE TABLE `tb_data_format`  (
  `id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '数据格式编号',
  `task_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '任务编号',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '数据名称',
  `type` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '数据类型',
  `tips` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '输入提示信息',
  `english_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '英文名称（标识符）',
  `size` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '28 28' COMMENT 'image数据尺寸',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_data_format
-- ----------------------------
INSERT INTO `tb_data_format` VALUES ('609532441450782720', '609532441316564992', '图片', 'image', '请输入正确值', 'image', '28 28', '2021-08-10 07:44:18', '2021-08-10 07:44:18');
INSERT INTO `tb_data_format` VALUES ('609532441450782721', '609532441316564992', '值', 'number', '请输入正确值', 'value', '', '2021-08-10 07:44:18', '2021-08-10 07:44:18');
INSERT INTO `tb_data_format` VALUES ('609532725770067968', '609532725627461632', '图片', 'image', '请输入正确值', 'image', '28 28', '2021-08-10 07:45:26', '2021-08-10 07:45:26');
INSERT INTO `tb_data_format` VALUES ('609532725770067969', '609532725627461632', '值', 'number', '请输入正确值', 'value', '', '2021-08-10 07:45:26', '2021-08-10 07:45:26');
INSERT INTO `tb_data_format` VALUES ('609533389074079744', '609533388948250624', '图片', 'image', '请输入正确值', 'image', '28 28', '2021-08-10 07:48:04', '2021-08-10 07:48:04');
INSERT INTO `tb_data_format` VALUES ('609533389074079745', '609533388948250624', '值', 'number', '请输入正确值', 'value', '', '2021-08-10 07:48:04', '2021-08-10 07:48:04');
INSERT INTO `tb_data_format` VALUES ('609533895838277632', '609533895666311168', '图片', 'image', '请输入正确值', 'image', '28 28', '2021-08-10 07:50:05', '2021-08-10 07:50:05');
INSERT INTO `tb_data_format` VALUES ('609533895838277633', '609533895666311168', '值', 'number', '请输入正确值', 'value', '', '2021-08-10 07:50:05', '2021-08-10 07:50:05');

-- ----------------------------
-- Table structure for tb_global_model
-- ----------------------------
DROP TABLE IF EXISTS `tb_global_model`;
CREATE TABLE `tb_global_model`  (
  `id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '全局模型编号',
  `last_global_model` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '延续的上一个全局模型',
  `task_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '任务名称',
  `file` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '全局模型地址',
  `test_data` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '测试数据',
  `acc` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '模型准确率',
  `time` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '模型聚合消耗的时间',
  `client_model_ids` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '引用它的客户端模型',
  `fed_avg_with_clients` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '所引用的客户端模型',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_global_model
-- ----------------------------
INSERT INTO `tb_global_model` VALUES ('609532441350119424', '609532441316564992', '609532441316564992', '/models/globalModelSameDir/vRdXt9L28LxzXfp05its/model.json', '', '0', '0', '', '', '2021-08-09 23:44:18', '2021-08-09 23:44:18');
INSERT INTO `tb_global_model` VALUES ('609532725673598976', '609532725627461632', '609532725627461632', '/models/globalModelSameDir/aYKIkVYVerVLRBAGfeHM/model.json', '', '0', '0', '', '', '2021-08-09 23:45:26', '2021-08-09 23:45:26');
INSERT INTO `tb_global_model` VALUES ('609533388977610752', '609533388948250624', '609533388948250624', '/models/globalModelSameDir/E8pGwLRuKcgRPxFNtWUC/model.json', '', '0', '0', '', '', '2021-08-09 23:48:04', '2021-08-09 23:48:04');
INSERT INTO `tb_global_model` VALUES ('609533895720837120', '609533895666311168', '609533895666311168', '/models/globalModelSameDir/pW8ZReJtv6zRWHN4hQXD/model.json', '', '0', '0', '', '', '2021-08-09 23:50:05', '2021-08-09 23:50:05');
INSERT INTO `tb_global_model` VALUES ('641552459382136832', '641552459348582400', '641552459348582400', '1', '', '0', '0', '', '', '2021-11-06 08:20:26', '2021-11-06 08:20:26');
INSERT INTO `tb_global_model` VALUES ('641552515510312960', '641552515455787008', '641552515455787008', '1', '', '0', '0', '', '', '2021-11-06 08:20:39', '2021-11-06 08:20:39');

-- ----------------------------
-- Table structure for tb_oauth_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `tb_oauth_access_tokens`;
CREATE TABLE `tb_oauth_access_tokens`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `fr_user_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '外键:tb_users表id',
  `client_id` int UNSIGNED NULL DEFAULT 1 COMMENT '普通用户的授权，默认为1',
  `token` varchar(600) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `action_name` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT '' COMMENT 'login|refresh|reset表示token生成动作',
  `scopes` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT '[*]' COMMENT '暂时预留,未启用',
  `revoked` tinyint(1) NULL DEFAULT 0 COMMENT '是否撤销',
  `client_ip` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ipv6最长为128位',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `oauth_access_tokens_user_id_index`(`fr_user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_oauth_access_tokens
-- ----------------------------
INSERT INTO `tb_oauth_access_tokens` VALUES (1, '1', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiJ6aGFuZ3J1aXl1YW4iLCJwaG9uZSI6IiIsImV4cCI6MTYyODU4MDc2OSwibmJmIjoxNjI4NTUxOTU5fQ.lJyQHoScKMCkXw-SkyBnT0SLmI-ED5VzlHobGv_8ojE', 'login', '[*]', 0, '103.88.46.127', '2021-08-09 23:32:49', '2021-08-09 23:32:49', '2021-08-10 15:32:49');
INSERT INTO `tb_oauth_access_tokens` VALUES (2, '1', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiJ6aGFuZ3J1aXl1YW4iLCJwaG9uZSI6IiIsImV4cCI6MTYyODU4MDgxNSwibmJmIjoxNjI4NTUyMDA1fQ.mxKVkPowdSnxjk5dxMIRkyben-iCk03AlchBDaQlMrY', 'login', '[*]', 0, '222.205.46.69', '2021-08-09 23:33:35', '2021-08-09 23:33:35', '2021-08-10 15:33:35');
INSERT INTO `tb_oauth_access_tokens` VALUES (3, '1', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiJ6aGFuZ3J1aXl1YW4iLCJwaG9uZSI6IiIsImV4cCI6MTYyODU4MTI5MiwibmJmIjoxNjI4NTUyNDgyfQ.LNlqnFQbp0Ow78bBKhWm9CiJDgA-gjqpE7N3u7R7WUI', 'login', '[*]', 0, '222.205.46.69', '2021-08-09 23:41:32', '2021-08-09 23:41:32', '2021-08-10 15:41:32');

-- ----------------------------
-- Table structure for tb_questionaire
-- ----------------------------
DROP TABLE IF EXISTS `tb_questionaire`;
CREATE TABLE `tb_questionaire`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `template_intro` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `question1` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `question2` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `question3` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `question4` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `question5` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `question6` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `question7` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `question8` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `question9` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `question10` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `answer1` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `answer2` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `answer3` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `answer4` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `answer5` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `answer6` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `answer7` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `answer8` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `answer9` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `answer10` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `created_at` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `updated_at` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `reward` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT '',
  `views` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_questionaire
-- ----------------------------
INSERT INTO `tb_questionaire` VALUES ('2fw1GFyzyk', 'title', 'templateIntro', 'question_1', 'question_2', 'question_3', 'question_4', 'question_5', 'question_6', 'question_7', 'question_8', 'question_9', 'question_10', 'answer_1', 'answer_2', 'answer_3', 'answer_4', 'answer_5', 'answer_6', 'answer_7', 'answer_8', 'answer_9', 'answer_10', '', '', '', NULL);
INSERT INTO `tb_questionaire` VALUES ('609532441316564992', '班级通讯录', '未名一苑班级同学通讯录', '学号', '1', '姓名', '阳家勋', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', NULL);
INSERT INTO `tb_questionaire` VALUES ('Ms8m5gem5Y', 'title', 'templateIntro', 'question_1', 'question_2', 'question_3', 'question_4', 'question_5', 'question_6', 'question_7', 'question_8', 'question_9', 'question_10', 'answer_1', 'answer_2', 'answer_3', 'answer_4', 'answer_5', 'answer_6', 'answer_7', 'answer_8', 'answer_9', 'answer_10', '', '', '', NULL);

-- ----------------------------
-- Table structure for tb_questionaire_participate_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_questionaire_participate_user`;
CREATE TABLE `tb_questionaire_participate_user`  (
  `questionaire_participate_user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `questionaire_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`questionaire_participate_user_name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_questionaire_participate_user
-- ----------------------------
INSERT INTO `tb_questionaire_participate_user` VALUES ('yangjiaxun', '609532441316564992');

-- ----------------------------
-- Table structure for tb_questionaire_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_questionaire_user`;
CREATE TABLE `tb_questionaire_user`  (
  `questionaire_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`questionaire_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_questionaire_user
-- ----------------------------
INSERT INTO `tb_questionaire_user` VALUES ('609532441316564992', 'yangjiaxun');

-- ----------------------------
-- Table structure for tb_task
-- ----------------------------
DROP TABLE IF EXISTS `tb_task`;
CREATE TABLE `tb_task`  (
  `id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '任务编号',
  `category_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类编号',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '联邦学习任务名称',
  `description` varchar(3000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '联邦学习描述',
  `file` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '封面图片地址',
  `init_model_file` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '初始化文件地址',
  `super_params` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '超参数设置',
  `max_times_per_client` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '2' COMMENT '每个客户端可以参与的训练的次数',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_task
-- ----------------------------
INSERT INTO `tb_task` VALUES ('609532441316564992', '1', '手写数字识别-浙江大学群体实验', '手写体数字识别本身并没有多大的难度，我在阅读了早期的一篇论文[1]【Backpropagation Applied to Handwritten Zip Code Recognition】之后想把这个基础的实验自己完完整整地动手做一遍。这个实验的目标有两个，一是通过实验掌握tensorflow中slim这个API，把搭建和测试网络、处理数据的完整流程再熟悉一遍；二是通过卷积网络识别手写体数字这个过程，加深对卷积网络的原理的理解。', '/images/back/U0ZPsPXIxUpgZUoNVMmB.webp', '/models/globalModelSameDir/vRdXt9L28LxzXfp05its/model.json', 'epochs=5', '7', '2021-08-10 07:44:18', '2021-08-10 07:44:18');
INSERT INTO `tb_task` VALUES ('609532725627461632', '2', '人脸识别实验', '所用的数据集是LFW(LabeledFaces in the Wild Home)，它和FDDB(Face Detection Data Set and Benchmark)作为人脸识别最权威的两个数据集，分别对人脸识别中最基本的两个问题：检测和识别，给出了详细的测试要求与评分标准。\n\n\nLFW（人脸比对数据集）\n\n无约束自然场景人脸识别数据集，该数据集由13000多张全世界知名人士互联网自然场景不同朝向、表情和光照环境人脸图片组成，共有5749人，其中有1680人有2张或2张以上人脸图片。每张人脸图片都有其唯一的姓名ID和序号加以区分。\n\nLFW数据集主要测试人脸识别的准确率，该数据库从中随机选择了6000对人脸组成了人脸辨识图片对，其中3000对属于同一个人2张人脸照片，3000对属于不同的人每人1张人脸照片。测试过程LFW给出一对照片，询问测试中的系统两张照片是不是同一个人，系统给出“是”或“否”的答案。通过6000对人脸测试结果的系统答案与真实答案的比值可以得到人脸识别准确率。', '/images/back/Dmuz1EQWMSgs8WfiqcLy.jpeg', '/models/globalModelSameDir/aYKIkVYVerVLRBAGfeHM/model.json', 'epochs=5', '10', '2021-08-10 07:45:26', '2021-08-10 07:45:26');
INSERT INTO `tb_task` VALUES ('609533388948250624', '1', '波士顿房价预测', '机器学习算法理论在上个世纪90年代发展成熟，在许多领域都取得了成功应用。但平静的日子只延续到2010年左右，随着大数据的涌现和计算机算力提升，深度学习模型异军突起，极大改变了机器学习的应用格局。今天，多数机器学习任务都可以使用深度学习模型解决，尤其在在语音、计算机视觉和自然语言处理等领域，深度学习模型的效果比传统机器学习算法有显著提升。', '/images/back/wW1q0C8PrthKm1mEcD95.webp', '/models/globalModelSameDir/E8pGwLRuKcgRPxFNtWUC/model.json', 'epochs=6', '4', '2021-08-10 07:48:04', '2021-08-10 07:48:04');
INSERT INTO `tb_task` VALUES ('609533895666311168', '1', '鸢尾花分类任务-广东省区域实验', '这本《鸢尾花》不是给常人看的童话，它们涉及的不是是世俗生活，而是求道的过程。黑塞在故事中运用了许多化身。关注黑塞的中文出版作品的朋友在阅读这本书之时，将会感到熟悉，童书里讲述的人物在其他小说中已有痕迹。遗憾的是，我并不知道这些童话的完成时间，也就无从从时间线上说明，两者的影响序列究竟如何', '/images/back/WfT1f2WkfDRFmaKc6jMr.jpeg', '/models/globalModelSameDir/pW8ZReJtv6zRWHN4hQXD/model.json', 'epochs=5', '2', '2021-08-10 07:50:05', '2021-08-10 07:50:05');
INSERT INTO `tb_task` VALUES ('641552459348582400', '1', '1', '1', '1', '1', '1', '1', '2021-11-06 16:20:25', '2021-11-06 16:20:25');
INSERT INTO `tb_task` VALUES ('641552515455787008', '1', '1', '1', '1', '1', '1', '1', '2021-11-06 16:20:39', '2021-11-06 16:20:39');

-- ----------------------------
-- Table structure for tb_task_participate_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_task_participate_user`;
CREATE TABLE `tb_task_participate_user`  (
  `task_participate_user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `task_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_task_participate_user
-- ----------------------------
INSERT INTO `tb_task_participate_user` VALUES ('yangjiaxun', '609532441316564992');

-- ----------------------------
-- Table structure for tb_task_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_task_user`;
CREATE TABLE `tb_task_user`  (
  `id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '任务-用户关系表编号',
  `task_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '任务编号',
  `task_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '联邦学习任务名称',
  `user_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户编号',
  `user_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '用户名称',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_task_user
-- ----------------------------
INSERT INTO `tb_task_user` VALUES ('609537318759440384', '609532441316564992', '手写数字识别-浙江大学群体实验', '11', 'yangjiaxun', '2021-08-10 08:03:41', '2021-08-10 08:03:41');

-- ----------------------------
-- Table structure for tb_users
-- ----------------------------
DROP TABLE IF EXISTS `tb_users`;
CREATE TABLE `tb_users`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '账号',
  `pass` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '密码',
  `real_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '姓名',
  `phone` char(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '手机',
  `status` tinyint NULL DEFAULT 1 COMMENT '状态',
  `remark` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '备注',
  `last_login_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login_ip` char(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '最近一次登录ip',
  `login_times` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '累计登录次数',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_users
-- ----------------------------
INSERT INTO `tb_users` VALUES (1, '11', 'a53ec42f2a2914067f6119599cae318b', '', '', 1, '', '2021-08-09 23:32:42', '', '0', '2021-08-09 23:32:42', '2021-08-09 23:32:42');
INSERT INTO `tb_users` VALUES (2, 'wuchao', '87d9bb400c0634691f0e3baaf1e2fd0d', '', '', 1, '', '2021-08-09 23:32:42', '', '0', '2021-08-09 23:32:42', '2021-08-09 23:32:42');
INSERT INTO `tb_users` VALUES (3, 'lizexi', '87d9bb400c0634691f0e3baaf1e2fd0d', '', '', 1, '', '2021-08-09 23:32:42', '', '0', '2021-08-09 23:32:42', '2021-08-09 23:32:42');
INSERT INTO `tb_users` VALUES (4, 'zhouyuhang', '87d9bb400c0634691f0e3baaf1e2fd0d', '', '', 1, '', '2021-08-09 23:32:42', '', '0', '2021-08-09 23:32:42', '2021-08-09 23:32:42');
INSERT INTO `tb_users` VALUES (5, 'tangzuoqi', '87d9bb400c0634691f0e3baaf1e2fd0d', '', '', 1, '', '2021-08-09 23:32:42', '', '0', '2021-08-09 23:32:42', '2021-08-09 23:32:42');
INSERT INTO `tb_users` VALUES (6, 'zhangjie', '87d9bb400c0634691f0e3baaf1e2fd0d', '', '', 1, '', '2021-08-09 23:32:42', '', '0', '2021-08-09 23:32:42', '2021-08-09 23:32:42');

SET FOREIGN_KEY_CHECKS = 1;
