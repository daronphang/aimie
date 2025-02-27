package handler

import (
	"aimie-go/internal"
	"aimie-go/internal/usecase"
	"net/http"

	"github.com/labstack/echo/v4"
)

var logger, _ = internal.WireLogger()

type MessageResponse struct {
	Message string 	`json:"message"`
}

type RestHandler struct {
	usecase *usecase.UseCaseService
}

func NewRestHandler(uc *usecase.UseCaseService) *RestHandler {
	return &RestHandler{usecase: uc}
}

func (h *RestHandler) Heartbeat(c echo.Context) error {
	return c.String(http.StatusOK, "aimie-go is alive")
}
