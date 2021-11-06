package questionaire

import (
	"github.com/gin-gonic/gin"
	controller "goskeleton/app/http/controller/questionaire"
)

type Add struct {
	BaseField
}

func (t Add) CheckParams(c *gin.Context) {
	(&controller.Questionaire{}).Add()
}
