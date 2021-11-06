/**
 * @note:
 * @author: yangjiaxun
 * @date:2021/7/19
**/
package baizeStar

import (
	_ "container/list"
	"encoding/json"
	"errors"
	"go.uber.org/zap"
	"goskeleton/app/global/variable"
	"goskeleton/app/model"
	"strconv"
	_ "strings"
)

func CreatBaizeStarFactory(sqlType string) *BaizeStarModel {
	return &BaizeStarModel{BaseModel: model.BaseModel{DB: model.UseDbConn(sqlType)}}
}

// 我在这里犯了一个错误，在struct中的属性，严格区分首字母大小写，大写为公有属性，外面可以访问到，小写为私有，外面访问不到。
type BaizeStarModel struct {
	model.BaseModel
	Id        string `json:"id"`
	Reward    string `json:"reward"`
	UserName  string `json:"user_name"`
	UpdatedAt string `json:"updated_at"`
	CreatedAt string `json:"create_at"`
}

// 表名
func (c *BaizeStarModel) TableName() string {
	return "tb_baizeStar"
}

// 新增一项白泽星
func (t *BaizeStarModel) InsertData(tmp BaizeStarModel) *BaizeStarModel {
	if res := t.Create(&tmp); res.Error == nil {
		return &tmp
	} else {
		variable.ZapLog.Error("BaizeStarModel 数据新增出错", zap.Error(res.Error))
		return nil
	}
	return &tmp
}

// 查询白泽星列表
func (c *BaizeStarModel) List(limitStart, limit int) (list []BaizeStarModelView) {
	sql := `
		SELECT  t.*
		FROM tb_baizeStar as t;
	`
	if res := c.Raw(sql, limitStart, limit).Find(&list); res.Error != nil {
		variable.ZapLog.Error("BaizeStarModel 查询出错", zap.Error(res.Error))
	}
	return
}

// 查询白泽星列表
func (c *BaizeStarModel) Select(limitStart, limit int, kind, categoryId, keyword string) (list []BaizeStarModelView) {
	sql := `
		SELECT  t.*
		FROM tb_baizeStar as t
	`
	if keyword != "" {
		sql += " and ( t.name like '%" + keyword + "%' or t.description like '%" + keyword + "%' or t.id like '%" + keyword + "%' or c.name like '%" + keyword + "%')"
	}

	if res := c.Raw(sql, limitStart, limit).Find(&list); res.Error != nil {
		variable.ZapLog.Error("BaizeStarModel 查询出错", zap.Error(res.Error))
		return nil
	} else {
		return
	}
}

// 白泽星详情信息查询
func (t *BaizeStarModel) Detail(id string) (tv BaizeStarModelView, err error) {
	sql := `
		SELECT  t.*
		FROM tb_baizeStar as t, tb_category as c where t.category_id =c.id and t.id = ?;
	`
	if res := t.Raw(sql, id).Take(&tv); res.Error != nil {
		variable.ZapLog.Error("BaizeStarModel 查询出错", zap.Error(res.Error))
		err = errors.New("")
	}
	return
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
