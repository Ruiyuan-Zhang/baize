/**
 * @note:
 * @author: zhangruiyuan
 * @date:2021/7/23
**/
package task

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"goskeleton/app/global/variable"
	"goskeleton/app/model"
	"goskeleton/app/utils/data_bind"
	"strconv"
)

func CreatTaskUserFactory(sqlType string) *TaskUserModelView {
	return &TaskUserModelView{BaseModel: model.BaseModel{DB: model.UseDbConn(sqlType)}}
}

// 任务用户关系项
type TaskUserModelView struct {
	model.BaseModel
	Id       string `json:"id"`
	TaskId   string `json:"taskId"`
	TaskName string `json:"taskName"`
	UserId   string `json:"userId"`
	UserName string `json:"userName"`
}

// 表名
func (c *TaskUserModelView) TableName() string {
	return "tb_task_user"
}

// 添加一个任务用户关系项
func (t *TaskUserModelView) Add(c *gin.Context) error {
	var tmp TaskUserModelView
	if err := data_bind.ShouldBindFormDataToModel(c, &tmp); err == nil {
		tmp.Id = strconv.FormatInt(variable.SnowFlake.GetId(), 10)
		if res := t.Create(&tmp); res.Error == nil {
			return nil
		} else {
			variable.ZapLog.Error("TaskUserModel 数据新增出错", zap.Error(res.Error))
			return res.Error
		}
	} else {
		variable.ZapLog.Error("TaskUserModel 数据绑定出错", zap.Error(err))
		return err
	}
}

func (t *TaskUserModelView) Have(user_name, task_id string) *TaskUserModelView {
	sql := `SELECT * FROM tb_task_user  where user_name=? and task_id = ?`
	var tu TaskUserModelView
	res := t.Raw(sql, user_name, task_id).First(&tu)
	if res.Error == nil {
		if res.RowsAffected > 0 {
			return &tu
		} else {
			return nil
		}
	} else {
		variable.ZapLog.Error("TaskUserModelView Have查询出错", zap.Error(res.Error))
		return nil
	}

}

// 查询某用户加入的任务列表
func (c *TaskUserModelView) JoinList(user_name string, limitStart, limit int) (list []TaskModelView) {
	sql := `
		SELECT  t.*, tu.created_at as tu_created_at  FROM tb_task as t, tb_task_user as tu
		where t.id = tu.task_id and tu.user_name = ?
 		LIMIT ?,?
	`
	if res := c.Raw(sql, user_name, limitStart, limit).Find(&list); res.Error != nil {
		variable.ZapLog.Error("TaskUserModelView 查询出错", zap.Error(res.Error))
		return nil
	}
	return
}
