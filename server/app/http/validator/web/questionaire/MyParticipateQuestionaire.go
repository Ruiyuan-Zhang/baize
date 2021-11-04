package questionaire

import (
	"github.com/gin-gonic/gin"
	"goskeleton/app/global/consts"
	"goskeleton/app/http/controller/questionaire"
	common_data_type "goskeleton/app/http/validator/common/data_type"
	"goskeleton/app/http/validator/core/data_transfer"
	"goskeleton/app/utils/response"
)

type MyParticipateQuestionaireList struct {
	common_data_type.Page
}

func (t List) CheckParticipateListParams (c * gin.Context){
	if err:=c.ShouldBind(&t);err!=nil{
		errs:=gin.H{
			"tips":"questionaire 参数校验失败，参数不符合规定，page的值(>0)、limit的值(>0)",
			"err":err.Error(),
		}
		response.ErrorParam(c,errs)
		return
	}
	if ec := data_transfer.DataAddContext(t,consts.ValidatorPrefix,c);ec ==nil{
		response.ErrorSystem(c,"questionaire list 表单验证器json化失败","")
	}else {
		(&questionaire.Questionaire{}).List(ec)
	}
}
