package questionaire

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/qifengzhang007/sql_res_to_tree"
	"go.uber.org/zap"
	"goskeleton/app/global/variable"
	"goskeleton/app/model"
	"goskeleton/app/utils/data_bind"
	"strconv"
)

func CreatQuestionaireFactory(sqlType string) *QuestionaireModel {
	return &QuestionaireModel{BaseModel: model.BaseModel{DB: model.UseDbConn(sqlType)}}
}

// 我在这里犯了一个错误，在struct中的属性，严格区分首字母大小写，大写为公有属性，外面可以访问到，小写为私有，外面访问不到。
type QuestionaireModel struct {
	model.BaseModel
	Id                string `json:"id"`
	CategoryId        string `json:"categoryId"`
	Name              string `json:"name"`
	Description       string `json:"description"`
	File              string `json:"file"`
	InitModelFile     string `json:"initModelFile"`
	SuperParams       string `json:"superParams"`
	MaxTimesPerClient int32  `json:"maxTimesPerClient"`
}

// 表名
func (c *QuestionaireModel) TableName() string {
	return "tb_questionaire"
}

// 新增一项任务
func (t *QuestionaireModel) InsertData(c *gin.Context) *QuestionaireModel {
	var tmp QuestionaireModel
	if err := data_bind.ShouldBindFormDataToModel(c, &tmp); err == nil {
		tmp.Id = strconv.FormatInt(variable.SnowFlake.GetId(), 10) // 后面的10表示10进制
		if res := t.Create(&tmp); res.Error == nil {
			return &tmp
		} else {
			variable.ZapLog.Error("QuestionaireModel 数据新增出错", zap.Error(res.Error))
			return nil
		}
	} else {
		variable.ZapLog.Error("QuestionaireModel 数据绑定出错", zap.Error(err))
		return nil
	}

}

// 查询问卷列表
func (c *QuestionaireModel) List(limitStart, limit int) (list []QuestionaireModelView) {
	sql := `
		SELECT  c.name as category_name, t.*
		FROM tb_questionaire as t, tb_category as c where t.category_id =c.id LIMIT ?, ?;
	`
	if res := c.Raw(sql, limitStart, limit).Find(&list); res.Error != nil {
		variable.ZapLog.Error("QuestionaireModel 查询出错", zap.Error(res.Error))
	}
	return
}

// 查询问卷列表
func (c *QuestionaireModel) Select(limitStart, limit int, kind, categoryId, keyword string) (list []QuestionaireModelView) {

	sql := `
		SELECT  c.name as category_name, t.*
		FROM tb_questionaire as t, tb_category as c 
		where t.category_id =c.id
	`
	if categoryId != "" {
		sql += " and c.id = " + categoryId
	}
	if keyword != "" {
		sql += " and ( t.name like '%" + keyword + "%' or t.description like '%" + keyword + "%' or t.id like '%" + keyword + "%' or c.name like '%" + keyword + "%')"
	}
	sql += " LIMIT ?, ?;"

	if res := c.Raw(sql, limitStart, limit).Find(&list); res.Error != nil {
		variable.ZapLog.Error("QuestionaireModel 查询出错", zap.Error(res.Error))
		return nil
	} else {
		return
	}
}

// 任务详情信息查询
func (t *QuestionaireModel) Detail(id string) (tv QuestionaireModelView, err error) {
	sql := `
		SELECT  c.name as category_name, t.*
		FROM tb_questionaire as t, tb_category as c where t.category_id =c.id and t.id = ?;
	`
	if res := t.Raw(sql, id).Take(&tv); res.Error != nil {
		variable.ZapLog.Error("QuestionaireModel 查询出错", zap.Error(res.Error))
		err = errors.New("")
	}
	return
}

// 查询参与问卷列表
func (c *QuestionaireModel) ParticipateSelect(limitStart, limit int, kind, categoryId, keyword string) (list []QuestionaireModelView) {

	sql := `
		SELECT  c.name as category_name, t.*
		FROM tb_tuestionaire as t, tb_category as c 
		where t.category_id =c.id
	`
	if categoryId != "" {
		sql += " and c.id = " + categoryId
	}
	if keyword != "" {
		sql += " and ( t.name like '%" + keyword + "%' or t.description like '%" + keyword + "%' or t.id like '%" + keyword + "%' or c.name like '%" + keyword + "%')"
	}
	sql += " LIMIT ?, ?;"

	if res := c.Raw(sql, limitStart, limit).Find(&list); res.Error != nil {
		variable.ZapLog.Error("QuestionaireModel 查询出错", zap.Error(res.Error))
		return nil
	} else {
		return
	}
}

// 查询发布问卷列表
func (c *QuestionaireModel) PublishSelect(limitStart, limit int, kind, categoryId, keyword string) (list []QuestionaireModelView) {

	sql := `
		SELECT  c.name as category_name, t.*
		FROM tb_tuestionaire as t, tb_category as c 
		where t.category_id =c.id
	`
	if categoryId != "" {
		sql += " and c.id = " + categoryId
	}
	if keyword != "" {
		sql += " and ( t.name like '%" + keyword + "%' or t.description like '%" + keyword + "%' or t.id like '%" + keyword + "%' or c.name like '%" + keyword + "%')"
	}
	sql += " LIMIT ?, ?;"

	if res := c.Raw(sql, limitStart, limit).Find(&list); res.Error != nil {
		variable.ZapLog.Error("QuestionaireModel 查询出错", zap.Error(res.Error))
		return nil
	} else {
		return
	}
}


// 任务详情信息查询 包含format信息
func (t *QuestionaireModel) DetailWithFormat(id string) (QuestionaireModelViewWithDataFormat, error) {
	sql := `
		SELECT  c.name as category_name, t.*,
		d.id as data_format_id, d.type as data_format_type, d.name as data_format_name, 
		d.size as data_format_size, d.questionaire_id as data_format_questionaire_id,
		d.english_name as data_format_english_name,
		d.tips as data_format_tips
		FROM tb_questionaire as t, tb_category as c,tb_data_format as d 
		where t.category_id =c.id and t.id=d.questionaire_id and t.id = ?;
	`
	var tvdl []QuestionaireModelViewWithDataFormatList
	if res := t.Raw(sql, id).Find(&tvdl); res.Error == nil {
		var tvd = make([]QuestionaireModelViewWithDataFormat, 0)
		if err := sql_res_to_tree.CreateSqlResFormatFactory().ScanToTreeData(tvdl, &tvd); err == nil {
			for i := 0; i < len(tvd); i++ {
				tvd[i].IdStr = strconv.FormatInt(tvd[i].Id, 10)
				for j := 0; j < len(tvd[i].Children); j++ {
					tvd[i].Children[j].DataFormatIdStr = strconv.FormatInt(tvd[i].Children[j].DataFormatId, 10)
				}
			}
			return tvd[0], nil
		} else {
			variable.ZapLog.Error("QuestionaireModel 属性化出错" + err.Error())
			return QuestionaireModelViewWithDataFormat{}, errors.New("未查询到该任务")
		}

	} else {
		variable.ZapLog.Error("DetailWithFormat 查询出错", zap.Error(res.Error))
		return QuestionaireModelViewWithDataFormat{}, errors.New("")
	}
}
