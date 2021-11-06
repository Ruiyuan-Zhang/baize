/**
 * @Author: ModestYjx
 * @Description:
 * @File:  baizeStar_user
 * @Version: 1.0.0
 * @Date: 2021/11/6 14:44
 */
package baizeStar

import (
	"github.com/gin-gonic/gin"
	controller "goskeleton/app/http/controller/baizeStar"
)

type Add struct {
	BaseField
}

// 验证器验证
// 特别注意: 表单参数验证器结构体的函数，绝对不能绑定在指针上
// 我们这部分代码项目启动后会加载到容器，如果绑定在指针，一次请求之后，会造成容器中的代码段被污染
func (t Add) CheckParams(c *gin.Context) {
	(&controller.BaizeStar{}).Add()
}
