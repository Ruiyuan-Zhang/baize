/**
 * @note:
 * @author: zhangruiyuan
 * @date:2021/7/19
**/
package baizeStar

type BaizeStarModelView struct {
	Id       string `json:"id"`
	Reward   string `json:"reward"`
	CreateAt string `json:"create_at"`
	UserName string `json:"user_name"`
}

type BaizeStarModelViewWithDataFormatList struct {
	Id       string `json:"id"`
	Reward   string `json:"reward"`
	CreateAt string `json:"create_at"`
	UserName string `json:"user_name"`
}

type BaizeStarModelViewWithDataFormat struct {
	Id       string `json:"id"`
	Reward   string `json:"reward"`
	CreateAt string `json:"create_at"`
	UserName string `json:"user_name"`
}
