/**
 * @Author: ModestYjx
 * @Description:
 * @File:  questionaire_user
 * @Version: 1.0.0
 * @Date: 2021/11/6 14:44
 */
package task

import (
	"github.com/gin-gonic/gin"
	"goskeleton/app/global/consts"
	"goskeleton/app/http/controller/task"
	common_data_type "goskeleton/app/http/validator/common/data_type"
	"goskeleton/app/http/validator/core/data_transfer"
	"goskeleton/app/utils/response"
)

type MyPublishList struct {
	common_data_type.Page
	UserName string `form:"userName" json:"userName"`
}

func (t MyPublishList) CheckParams(c *gin.Context) {
	if err := c.ShouldBind(&t); err != nil {
		errs := gin.H{
			"tips": "task 参数校验失败，参数不符合规定，page的值(>0)、limit的值(>0)",
			"err":  err.Error(),
		}
		response.ErrorParam(c, errs)
		return
	}
	if ec := data_transfer.DataAddContext(t, consts.ValidatorPrefix, c); ec == nil {
		response.ErrorSystem(c, "task list 表单验证器json化失败", "")
	} else {
		(&task.Task{}).PublishList(ec)
	}
}
