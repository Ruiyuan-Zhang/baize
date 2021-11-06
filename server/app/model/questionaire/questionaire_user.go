/**
 * @Author: ModestYjx
 * @Description:
 * @File:  questionaire_user
 * @Version: 1.0.0
 * @Date: 2021/11/6 14:44
 */

package questionaire

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"goskeleton/app/global/variable"
	"goskeleton/app/model"
	"goskeleton/app/utils/data_bind"
	"strconv"
)

func CreatQuestionaireUserFactory(sqlType string) *QuestionaireUserModelView {
	return &QuestionaireUserModelView{BaseModel: model.BaseModel{DB: model.UseDbConn(sqlType)}}
}

// 任务用户关系项
type QuestionaireUserModelView struct {
	model.BaseModel
	Id               string `json:"id"`
	QuestionaireId   string `json:"questionaireId"`
	QuestionaireName string `json:"questionaireName"`
	UserId           string `json:"userId"`
	UserName         string `json:"userName"`
}

// 表名
func (c *QuestionaireUserModelView) TableName() string {
	return "tb_questionaire_user"
}

// 添加一个任务用户关系项
func (t *QuestionaireUserModelView) Add(c *gin.Context) error {
	var tmp QuestionaireUserModelView
	if err := data_bind.ShouldBindFormDataToModel(c, &tmp); err == nil {
		tmp.Id = strconv.FormatInt(variable.SnowFlake.GetId(), 10)
		if res := t.Create(&tmp); res.Error == nil {
			return nil
		} else {
			variable.ZapLog.Error("QuestionaireUserModel 数据新增出错", zap.Error(res.Error))
			return res.Error
		}
	} else {
		variable.ZapLog.Error("QuestionaireUserModel 数据绑定出错", zap.Error(err))
		return err
	}
}

func (t *QuestionaireUserModelView) Have(user_name, questionaire_id string) *QuestionaireUserModelView {
	sql := `SELECT * FROM tb_questionaire_user  where user_name=? and questionaire_id = ?`
	var tu QuestionaireUserModelView
	res := t.Raw(sql, user_name, questionaire_id).First(&tu)
	if res.Error == nil {
		if res.RowsAffected > 0 {
			return &tu
		} else {
			return nil
		}
	} else {
		variable.ZapLog.Error("QuestionaireUserModelView Have查询出错", zap.Error(res.Error))
		return nil
	}

}

// 查询某用户加入的任务列表
func (c *QuestionaireUserModelView) JoinList(user_name string, limitStart, limit int) (list []QuestionaireModelView) {
	sql := `
		SELECT  t.*, tu.created_at as tu_created_at  FROM tb_questionaire as t, tb_questionaire_user as tu
		where t.id = tu.questionaire_id and tu.user_name = ?
 		LIMIT ?,?
	`
	if res := c.Raw(sql, user_name, limitStart, limit).Find(&list); res.Error != nil {
		variable.ZapLog.Error("QuestionaireUserModelView 查询出错", zap.Error(res.Error))
		return nil
	}
	return
}
