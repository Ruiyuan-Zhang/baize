/**
 * @Author: ModestYjx
 * @Description:
 * @File:  baizeStar
 * @Version: 1.0.0
 * @Date: 2021/11/7 2:44
 */

package baizeStar

import (
	"github.com/gin-gonic/gin"
	"goskeleton/app/global/consts"
	"goskeleton/app/model/baizeStar"
	"goskeleton/app/utils/response"
)

type BaizeStar struct {
}

// 添加一个白泽星
func (t *BaizeStar) Add() {
	// 继承某结构体
	baizestarExample := baizeStar.BaizeStarModel{
		Id:        "4",
		Reward:    "12",
		UserName:  "yangjiaxun",
		CreatedAt: "2021-08-10 07:44:18",
		UpdatedAt: "2021-08-10 08:44:18",
	}
	baizeStar.CreatBaizeStarFactory("").InsertData(baizestarExample)
}

// 获取白泽星列表
func (t *BaizeStar) List(context *gin.Context) {
	var limit = context.GetFloat64(consts.ValidatorPrefix + "limit")
	var limitStart = (context.GetFloat64(consts.ValidatorPrefix+"page") - 1) * limit
	list := baizeStar.CreatBaizeStarFactory("").List(int(limitStart), int(limit))
	if list != nil {
		response.Success(context, consts.CurdStatusOkMsg, gin.H{
			"list": list,
		})
	} else {
		response.Fail(context, consts.CurdSelectFailCode, consts.CurdSelectFailMsg, "")
	}
}

// 查询白泽星
func (t *BaizeStar) Select(context *gin.Context) {
	var limit = context.GetFloat64(consts.ValidatorPrefix + "limit")
	var limitStart = (context.GetFloat64(consts.ValidatorPrefix+"page") - 1) * limit
	var kind = context.GetString(consts.ValidatorPrefix + "kind")
	var categoryId = context.GetString(consts.ValidatorPrefix + "categoryId")
	var keyword = context.GetString(consts.ValidatorPrefix + "keyword")
	list := baizeStar.CreatBaizeStarFactory("").Select(int(limitStart), int(limit), kind, categoryId, keyword)
	if list != nil {
		response.Success(context, consts.CurdStatusOkMsg, gin.H{
			"list": list,
		})
	} else {
		response.Fail(context, consts.CurdSelectFailCode, consts.CurdSelectFailMsg, "")
	}
}

// 获取白泽星详情信息
func (t *BaizeStar) Detail(context *gin.Context) {
	var id = context.GetString(consts.ValidatorPrefix + "id")
	if d, err := baizeStar.CreatBaizeStarFactory("").Detail(id); err == nil {
		response.Success(context, consts.CurdStatusOkMsg, gin.H{"data": d})
	} else {
		response.Fail(context, consts.CurdSelectFailCode, consts.CurdSelectFailMsg, "查询不到该白泽星")
	}
}
