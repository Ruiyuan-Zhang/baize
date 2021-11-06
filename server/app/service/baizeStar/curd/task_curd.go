/**
* @note:
* @author: zhangruiyuan
* @date:2021/7/26
**/
package curd

//
//import (
//	"github.com/gin-gonic/gin"
//	"goskeleton/app/model/baizeStar"
//	model2 "goskeleton/app/model/model"
//)
//
//type BaizeStarCurd struct {
//}
//
//func (t *BaizeStarCurd) Add(c *gin.Context) *baizeStar.BaizeStarModel {
//	// 1. 插入白泽星对象
//	if tmp := baizeStar.CreatBaizeStarFactory("").InsertData(c); tmp != nil {
//		// 2. 插入全局模型对象 首次插入时，上一个globalModel编号为baizeStarId
//		if e := model2.CreatGlobalFactory("").Add(tmp.Id, tmp.Id, "0", "0", ""); e == nil {
//			return tmp
//		} else {
//			return nil
//		}
//	} else {
//		return nil
//	}
//}
