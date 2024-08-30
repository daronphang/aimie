package v1

import (
	"aimie-go/internal/delivery/rest/handler"

	"github.com/labstack/echo/v4"
)

func RegisterBaseRoutes(g *echo.Group, h *handler.RestHandler) {
	g.GET("/heartbeat", h.Heartbeat)
}

func RegisterSurveyRoutes(g *echo.Group, h *handler.RestHandler) {
	g.GET("", h.HandleGetSurveyResponses)
	g.POST("", h.HandleSaveSurveyResponse)
	g.GET("/questions", h.HandleGetSurveyQuestions)
	g.POST("/questions", h.HandleAddSurveyQuestions)
	g.PUT("/question", h.HandleUpdateSurveyQuestion)
}

