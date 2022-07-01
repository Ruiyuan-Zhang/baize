#include <algorithm>
#include "stdafx.h"
#include "iostream"
#include "ctime"
#include "cstdlib"
using namespace std;

class Modal{
    public:
    Modal addParams(Modal m) {
        // 对参数进行求和
        // ...

        return this;
    }
    Modal avg(Modal m, int l){
        // 对参数进行求平均
        // m/=l;

        return this;
    }
}

// 1 获取预测值
float predict(Modal modal){
    // 计算模型的准确率
    // 调用接口
    float p = rand();
    return p;
}

// 2 模型聚合
Modal fedavg(Modal *cs, int l){
    Modal globalModal;

    // 参数求和
    for(int i=0;i<l;i++){
        globalModal.addParams(ms[i]);
    }

    // 参数平均
    globalModal.avg(l);
    return globalModal;
}

// 求取边际差
// 3 shapley算法 
// 返回每个人收益的百分比
float[] shapley(Modal *cs, int l, float basicMoney/*每个问卷的基础定价比例*/){
    // 辅助数组 用来计算全排列
    int * is = new int[l];
    for (int i=0;i<l;i++){
        is[i] = 0;
    }

    // shapley 边界值和
    float *shapleyValues = new float[l];

    // 计算全排列下不同组织下的边际值和
    do{
        // 前面模型组合的总值
        float oldValue = predict(cs[0]);
        shapleyValues[0] = oldValue;
        for (int i=1;i<l;i++){
            // 获取聚合的模型
            Modal globalModal = fedavg(cs, i+1);

            // 当前组合的总值
            int newValue = predict(globalModal);

            // 边际值
            int marginalValue = newValue - oldValue;

            // 更新边界值和
            shapleyValues[i] += marginalValue; 
        }

	}while(next_permutation(is,is+l));

    // 计算全局shapley值和
    float asv = 0;
    for (int i=0;i<l;i++){
        // 不对没有做出贡献的用户进行惩罚
        if (shapleyValues[i]<0){
            shapleyValues[i] = 0;
        }
        asv+=shapleyValues[i];
    }

    // 计算每个子客户端所占的这一轮的比例
    for (int i=0;i<l;i++){
        shapleyValues[i] = shapleyValues[i] / asv * (1 - basicMoney) + basicMoney / l;
    }

    // 返回计算结果
    return shapleyValues;
}

int main(){

    // 获取客户端上传的子模型列表
    int l = 4;
    Modal *cs = new Modal[l];
    
    // 计算各模型的shapley值
    float basicMoney = 0.5;
    float * ss = shapley(cs,l,basicMoney);

    // 输出一下
    for (int i=0;i<l;i++){
        cout << ss[i]<<end;
    }


    return 0;
}