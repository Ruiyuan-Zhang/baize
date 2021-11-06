/**
 * @Author: ModestYjx
 * @Description:
 * @File:  questionaire_user
 * @Version: 1.0.0
 * @Date: 2021/11/6 14:44
 */

package questionaire

type QuestionaireModelView struct {
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

	InitModelFile string `json:"initModelFile"`
	SuperParams   string `json:"superParams"`
	Reward        string `json:"reward"`
	Views         string `json:"views"`
}

type QuestionaireModelViewWithDataFormatList struct {
	Id                       int64  `primaryKey:"yes"`
	CategoryName             string `gorm:"column:category_name"`
	CategoryId               string `gorm:"column:category_id"`
	Name                     string `gorm:"column:name"`
	Description              string `gorm:"column:description"`
	File                     string `gorm:"column:file"`
	InitModelFile            string `gorm:"column:init_model_file"`
	SuperParams              string `gorm:"column:super_params"`
	MaxTimesPerClient        int32  `gorm:"column:max_times_per_client"`
	CreatedAt                string `gorm:"column:created_at"`
	DataFormatQuestionaireId int64  `gorm:"column:data_format_task_id"`
	DataFormatId             int64  `gorm:"column:data_format_id" primaryKey:"yes"`
	DataFormatIdStr          string `gorm:"-"`
	DataFormatType           string `gorm:"column:data_format_type"`
	DataFormatName           string `gorm:"column:data_format_name"`
	DataFormatSize           string `gorm:"column:data_format_size"`
	DataFormatEnglishName    string `gorm:"column:data_format_english_name"`
	DataFormatTips           string `gorm:"column:data_format_tips"`
}

type QuestionaireModelViewWithDataFormat struct {
	Id                int64  `json:"id" primaryKey:"yes"`
	IdStr             string `json:"idStr" gorm:"-"`
	CategoryName      string `json:"categoryName" gorm:"column:category_name"`
	CategoryId        string `json:"categoryId" gorm:"column:category_id"`
	Name              string `json:"name"`
	Description       string `json:"description"`
	File              string `json:"file"`
	InitModelFile     string `json:"initModelFile" gorm:"column:init_model_file"`
	SuperParams       string `json:"superParams" gorm:"column:super_params"`
	MaxTimesPerClient int32  `json:"maxTimesPerClient" gorm:"column:max_times_per_client"`
	CreatedAt         string `json:"createAt" gorm:"column:created_at"`
	Children          []struct {
		DataFormatQuestionaireId int64  `fid:"Id" json:"taskId" gorm:"column:data_format_task_id"`
		DataFormatId             int64  `json:"id" primaryKey:"yes" gorm:"column:data_format_id"`
		DataFormatIdStr          string `json:"idStr" gorm:"-"`
		DataFormatType           string `json:"type" gorm:"column:data_format_type"`
		DataFormatName           string `json:"name" gorm:"column:data_format_name"`
		DataFormatSize           string `json:"size" gorm:"column:data_format_size"`
		DataFormatEnglishName    string `json:"englishName" gorm:"column:data_format_english_name"`
		DataFormatTips           string `json:"tips" gorm:"column:data_format_tips"`
	} `json:"dataFormats" gorm:"-"`
}
