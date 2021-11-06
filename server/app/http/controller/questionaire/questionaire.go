package questionaire

import (
	"github.com/gin-gonic/gin"
	"goskeleton/app/global/consts"
	"goskeleton/app/model/questionaire"
	"goskeleton/app/utils/rand"
	"goskeleton/app/utils/response"
)

type Questionaire struct {
}

// 添加一个问卷
func (t *Questionaire) Add() {
	// to do：前端传过来问卷的各个参数
	questionaire_example := questionaire.QuestionaireModel{
		Id:            rand.String(10),
		Title:         "title",
		TemplateIntro: "templateIntro",
		Question1:     "question_1",
		Question2:     "question_2",
		Question3:     "question_3",
		Question4:     "question_4",
		Question5:     "question_5",
		Question6:     "question_6",
		Question7:     "question_7",
		Question8:     "question_8",
		Question9:     "question_9",
		Question10:    "question_10",
		Answer1:       "answer_1",
		Answer2:       "answer_2",
		Answer3:       "answer_3",
		Answer4:       "answer_4",
		Answer5:       "answer_5",
		Answer6:       "answer_6",
		Answer7:       "answer_7",
		Answer8:       "answer_8",
		Answer9:       "answer_9",
		Answer10:      "answer_10",
	}
	questionaire.CreatQuestionaireFactory("").InsertData(questionaire_example)
}

// 获取我参与的问卷列表
func (t *Questionaire) ParticipateQuestionaireList(context *gin.Context) {
	var limit = context.GetFloat64(consts.ValidatorPrefix + "limit")
	var limitStart = (context.GetFloat64(consts.ValidatorPrefix+"page") - 1) * limit

	var userName = context.GetString(consts.ValidatorPrefix + "userName")
	// 新建一个问卷参与信息主体表，查询任务参与主体表中，participate_user_id为登录用户id的问卷列表
	list := questionaire.CreatQuestionaireFactory("").ParticipateSelect(int(limitStart), int(limit), userName)
	if list != nil {
		response.Success(context, consts.CurdStatusOkMsg, gin.H{
			"list": list,
		})
	} else {
		response.Fail(context, consts.CurdSelectFailCode, consts.CurdSelectFailMsg, "")
	}
}

// 获取我发布的问卷列表
func (t *Questionaire) PublishQuestionaireList(context *gin.Context) {
	var limit = context.GetFloat64(consts.ValidatorPrefix + "limit")
	var limitStart = (context.GetFloat64(consts.ValidatorPrefix+"page") - 1) * limit

	var userName = context.GetString(consts.ValidatorPrefix + "userName")
	// 问卷表应添加任务发布者的publish_user_id，查询任务表中publish_user_id为登录的用户id的问卷列表
	list := questionaire.CreatQuestionaireFactory("").PublishSelect(int(limitStart), int(limit), userName)
	if list != nil {
		response.Success(context, consts.CurdStatusOkMsg, gin.H{
			"list": list,
		})
	} else {
		response.Fail(context, consts.CurdSelectFailCode, consts.CurdSelectFailMsg, "")
	}
}

// 获取问卷列表
func (t *Questionaire) List(context *gin.Context) {
	var limit = context.GetFloat64(consts.ValidatorPrefix + "limit")
	var limitStart = (context.GetFloat64(consts.ValidatorPrefix+"page") - 1) * limit
	list := questionaire.CreatQuestionaireFactory("").List(int(limitStart), int(limit))
	if list != nil {
		response.Success(context, consts.CurdStatusOkMsg, gin.H{
			"list": list,
		})
	} else {
		response.Fail(context, consts.CurdSelectFailCode, consts.CurdSelectFailMsg, "")
	}
}

// 查询问卷
func (t *Questionaire) Select(context *gin.Context) {
	var limit = context.GetFloat64(consts.ValidatorPrefix + "limit")
	var limitStart = (context.GetFloat64(consts.ValidatorPrefix+"page") - 1) * limit
	var kind = context.GetString(consts.ValidatorPrefix + "kind")
	var categoryId = context.GetString(consts.ValidatorPrefix + "categoryId")
	var keyword = context.GetString(consts.ValidatorPrefix + "keyword")
	list := questionaire.CreatQuestionaireFactory("").Select(int(limitStart), int(limit), kind, categoryId, keyword)
	if list != nil {
		response.Success(context, consts.CurdStatusOkMsg, gin.H{
			"list": list,
		})
	} else {
		response.Fail(context, consts.CurdSelectFailCode, consts.CurdSelectFailMsg, "")
	}
}

// 获取问卷详情信息
func (t *Questionaire) Detail(context *gin.Context) {
	var id = context.GetString(consts.ValidatorPrefix + "id")

	if d, err := questionaire.CreatQuestionaireFactory("").Detail(id); err == nil {
		response.Success(context, consts.CurdStatusOkMsg, gin.H{"data": d})
	} else {
		response.Fail(context, consts.CurdSelectFailCode, consts.CurdSelectFailMsg, "查询不到该任务")
	}
}

// 获取问卷详情信息 包含数据格式
func (t *Questionaire) DetailWithFormat(context *gin.Context) {
	var id = context.GetString(consts.ValidatorPrefix + "id")
	if d, err := questionaire.CreatQuestionaireFactory("").DetailWithFormat(id); err == nil {
		response.Success(context, consts.CurdStatusOkMsg, gin.H{"data": d})
	} else {
		response.Fail(context, consts.CurdSelectFailCode, consts.CurdSelectFailMsg, "查询不到该任务")
	}
}
