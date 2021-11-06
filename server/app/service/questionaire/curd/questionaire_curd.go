package curd

//
//import (
//	"github.com/gin-gonic/gin"
//	"goskeleton/app/global/consts"
//	controller "goskeleton/app/http/controller/task"
//	"goskeleton/app/http/validator/core/data_transfer"
//	model2 "goskeleton/app/model/model"
//	"goskeleton/app/model/questionaire"
//	"goskeleton/app/model/task"
//	"goskeleton/app/service/questionaire/curd"
//	"goskeleton/app/utils/response"
//)
//
//type QuestionaireCurd struct {
//}
//
//func (t *QuestionaireCurd) Add(c *gin.Context) *questionaire.QuestionaireModel {
//	var limit = context.GetFloat64(consts.ValidatorPrefix + "limit")
//	var limitStart = (context.GetFloat64(consts.ValidatorPrefix+"page") - 1) * limit
//	list := task.CreatTaskFactory("").List(int(limitStart), int(limit))
//	if list != nil {
//		response.Success(context, consts.CurdStatusOkMsg, gin.H{
//			"list": list,
//		})
//	} else {
//		response.Fail(context, consts.CurdSelectFailCode, consts.CurdSelectFailMsg, "")
//	}
