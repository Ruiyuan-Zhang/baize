/**
 * @Author: ModestYjx
 * @Description:
 * @File:  questionaire_user
 * @Version: 1.0.0
 * @Date: 2021/11/6 14:44
 */

package questionaire

import (
	"encoding/json"
	"errors"
	"github.com/qifengzhang007/sql_res_to_tree"
	"go.uber.org/zap"
	"goskeleton/app/global/variable"
	"goskeleton/app/model"
	"strconv"
)

type QuestionaireModel struct {
	model.BaseModel
	Id            string `json:"id"`
	Title         string `json:"title"`
	TemplateIntro string `json:"templateIntro"`
	Question1     string `json:"question_1"`
	Question2     string `json:"question_2"`
	Question3     string `json:"question_3"`
	Question4     string `json:"question_4"`
	Question5     string `json:"question_5"`
	Question6     string `json:"question_6"`
	Question7     string `json:"question_7"`
	Question8     string `json:"question_8"`
	Question9     string `json:"question_9"`
	Question10    string `json:"question_10"`

	Answer1  string `json:"answer_1"`
	Answer2  string `json:"answer_2"`
	Answer3  string `json:"answer_3"`
	Answer4  string `json:"answer_4"`
	Answer5  string `json:"answer_5"`
	Answer6  string `json:"answer_6"`
	Answer7  string `json:"answer_7"`
	Answer8  string `json:"answer_8"`
	Answer9  string `json:"answer_9"`
	Answer10 string `json:"answer_10"`
	Reward   string `json:"reward"`
	Views    string `json:"views"`
}

func CreatQuestionaireFactory(sqlType string) *QuestionaireModel {
	return &QuestionaireModel{BaseModel: model.BaseModel{DB: model.UseDbConn(sqlType)}}
}

// 表名
func (c *QuestionaireModel) TableName() string {
	return "tb_questionaire"
}

// 新增一项问卷
func (t *QuestionaireModel) InsertData(tmp QuestionaireModel) *QuestionaireModel {
	if res := t.Create(&tmp); res.Error == nil {
		return &tmp
	} else {
		variable.ZapLog.Error("QuestionaireModel 数据新增出错", zap.Error(res.Error))
		return nil
	}
}

// 查询问卷列表
func (c *QuestionaireModel) List(limitStart, limit int) (list []QuestionaireModelView) {
	sql := `
		SELECT  t.*
		FROM tb_questionaire as t;
	`
	if res := c.Raw(sql, limitStart, limit).Find(&list); res.Error != nil {
		variable.ZapLog.Error("QuestionaireModel 查询出错", zap.Error(res.Error))
	}
	return
}

// 查询问卷列表
func (c *QuestionaireModel) Select(limitStart, limit int, kind, categoryId, keyword string) (list []QuestionaireModelView) {

	sql := `
		SELECT t.*
		FROM tb_questionaire as t, tb_category as c
	`
	sql += " LIMIT ?, ?;"
	if res := c.Raw(sql, limitStart, limit).Find(&list); res.Error != nil {
		variable.ZapLog.Error("QuestionaireModel 查询出错", zap.Error(res.Error))
		return nil
	} else {
		return
	}
}

// 问卷详情信息查询
func (t *QuestionaireModel) Detail(id string) (tv QuestionaireModelView, err error) {
	sql := `
		SELECT  t.*
		FROM tb_questionaire as t, tb_category as c where t.category_id =c.id and t.questionaire_id = ?;
	`
	if res := t.Raw(sql, id).Take(&tv); res.Error != nil {
		variable.ZapLog.Error("QuestionaireModel 查询出错", zap.Error(res.Error))
		err = errors.New("")
	}
	return
}

// 查询参与问卷列表
func (c *QuestionaireModel) ParticipateSelect(limitStart, limit int, userName string) (questionaire_list []QuestionaireModelView) { //这里的list是变量名，不是数据结构,to do
	// 查询问卷表中publish_user_id为登录的user_id的问卷列表
	sql := `
		SELECT  t_p_u.questionaire_id
		FROM tb_questionaire_participate_user as t_p_u
	`
	sql += "where t_p_u.questionaire_participate_user_name = '" + userName + "'"
	var questionaire_id_list []QuestionaireUserModelView
	if res := c.Raw(sql, limitStart, limit).Find(&questionaire_id_list); res.Error != nil {
		variable.ZapLog.Error("QuestionaireUserModel 查询出错", zap.Error(res.Error))
	}
	if questionaire_id_list != nil {
		for i := 0; i < len(questionaire_id_list); i++ {
			sql = `
				SELECT  t.*
				FROM tb_questionaire as t
			`
			sql += string("where t.id =" + Strval(questionaire_id_list[i].QuestionaireId))
			questionaire := QuestionaireModelView{
				"test_id",
				"test_caterotyname",
				"test_categoryid",
				"test_question",
				"test_question",
				"test_file",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_file",
				"test_para",
				"test_para",
				"test_para",
			}
			c.Raw(sql, limitStart, limit).Find(&questionaire)
			questionaire_list = append(questionaire_list, questionaire)
		}
	}
	return questionaire_list
}

//查询发布问卷列表
func (c *QuestionaireModel) PublishSelect(limitStart, limit int, userName string) (questionaire_list []QuestionaireModelView) {

	//查询问卷表中publish_user_id为登录的user_id的问卷列表
	sql := `
		SELECT  t_u.questionaire_id
		FROM tb_questionaire_user as t_u
	`
	sql += "where t_u.user_name = '" + userName + "'"
	var questionaire_id_list []QuestionaireUserModelView
	res := c.Raw(sql, limitStart, limit).Find(&questionaire_id_list)
	if res.Error != nil {
		variable.ZapLog.Error("QuestionaireUserModel 查询出错", zap.Error(res.Error))
	}
	// 每查寻一个questionaire，加入到questionaire列表中
	if questionaire_id_list != nil {
		for i := 0; i < len(questionaire_id_list); i++ {
			sql = `
				SELECT  t.*
				FROM tb_questionaire as t
			`
			sql += string("where t.id =" + Strval(questionaire_id_list[i].QuestionaireId))
			questionaire := QuestionaireModelView{
				"test_id",
				"test_caterotyname",
				"test_categoryid",
				"test_question",
				"test_question",
				"test_file",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_question",
				"test_file",
				"test_para",
				"test_para",
				"test_para",
			}
			c.Raw(sql, limitStart, limit).Find(&questionaire)
			questionaire_list = append(questionaire_list, questionaire)
		}
	}
	return questionaire_list
}

// 问卷详情信息查询 包含format信息
func (t *QuestionaireModel) DetailWithFormat(id string) (QuestionaireModelViewWithDataFormat, error) {
	sql := `
		SELECT  t.*,
		d.id as data_format_id, d.type as data_format_type, d.name as data_format_name, 
		d.size as data_format_size, d.questionaire_id as data_format_questionaire_id,
		d.english_name as data_format_english_name,
		d.tips as data_format_tips
		FROM tb_questionaire as t, tb_category as c,tb_data_format as d 
		where t.category_id =c.id and t.questionaire_id=d.questionaire_id and t.questionaire_id = ?;
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
			return QuestionaireModelViewWithDataFormat{}, errors.New("未查询到该问卷")
		}
	} else {
		variable.ZapLog.Error("DetailWithFormat 查询出错", zap.Error(res.Error))
		return QuestionaireModelViewWithDataFormat{}, errors.New("")
	}
}

// Strval 获取变量的字符串值
// 浮点型 3.0将会转换成字符串3, "3"
// 非数值或字符类型的变量将会被转换成JSON格式字符串
func Strval(value interface{}) string {
	// interface 转 string
	var key string
	if value == nil {
		return key
	}

	switch value.(type) {
	case float64:
		ft := value.(float64)
		key = strconv.FormatFloat(ft, 'f', -1, 64)
	case float32:
		ft := value.(float32)
		key = strconv.FormatFloat(float64(ft), 'f', -1, 64)
	case int:
		it := value.(int)
		key = strconv.Itoa(it)
	case uint:
		it := value.(uint)
		key = strconv.Itoa(int(it))
	case int8:
		it := value.(int8)
		key = strconv.Itoa(int(it))
	case uint8:
		it := value.(uint8)
		key = strconv.Itoa(int(it))
	case int16:
		it := value.(int16)
		key = strconv.Itoa(int(it))
	case uint16:
		it := value.(uint16)
		key = strconv.Itoa(int(it))
	case int32:
		it := value.(int32)
		key = strconv.Itoa(int(it))
	case uint32:
		it := value.(uint32)
		key = strconv.Itoa(int(it))
	case int64:
		it := value.(int64)
		key = strconv.FormatInt(it, 10)
	case uint64:
		it := value.(uint64)
		key = strconv.FormatUint(it, 10)
	case string:
		key = value.(string)
	case []byte:
		key = string(value.([]byte))
	default:
		newValue, _ := json.Marshal(value)
		key = string(newValue)
	}

	return key
}
