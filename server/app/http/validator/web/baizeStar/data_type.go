/**
 * @Author: ModestYjx
 * @Description:
 * @File:  questionaire_user
 * @Version: 1.0.0
 * @Date: 2021/11/6 14:44
 */
package baizeStar

type BaseField struct {
	Id                string `json:"id" form:"id"`
	CategoryId        string `json:"categoryId" form:"categoryId" binding:"required"`
	Name              string `json:"name" form:"name" binding:"required,min=1"`
	Description       string `json:"description" form:"description" binding:"required"`
	File              string `json:"file" form:"file" binding:"required"`
	InitModelFile     string `json:"initModelFile" form:"initModelFile" binding:"required"`
	SuperParams       string `json:"superParams" form:"superParams" binding:"required"`
	MaxTimesPerClient int32  `json:"maxTimesPerClient" form:"maxTimesPerClient" binding:"required,min=1"`
}
