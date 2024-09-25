package handler

import (
	"aimie-go/internal/domain"
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

func (h *RestHandler) HandleGetSurveyResponses(c echo.Context) error {
	rv, err := h.usecase.GetSurveyResponses(c.Request().Context())
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, rv)
}

func (h *RestHandler) HandleSaveSurveyResponse(c echo.Context) error {
	p := new([]domain.SurveyEntry)

	if err := c.Bind(p); err != nil {
		logger.Error("validation error", zap.String("trace", err.Error()))
		return newRequestValidationError(c, http.StatusBadRequest, err)
	}

	for _, x := range *p {
		if err := c.Validate(x); err != nil {
			logger.Error("validation error", zap.String("trace", err.Error()))
			return newRequestValidationError(c, http.StatusBadRequest, err)
		}
	}

	if err := h.usecase.SaveSurveyResponse(c.Request().Context(), *p); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, MessageResponse{Message: "success"})
}

func (h *RestHandler) HandleGetSurveyQuestions(c echo.Context) error {
	rv, err := h.usecase.GetSurveyQuestions(c.Request().Context())
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, rv)
}

func (h *RestHandler) HandleAddSurveyQuestions(c echo.Context) error {
	p := new([]domain.SurveyQuestion)

	if err := c.Bind(p); err != nil {
		logger.Error("validation error", zap.String("trace", err.Error()))
		return newRequestValidationError(c, http.StatusBadRequest, err)
	}

	if *p == nil || len(*p) == 0 {
		return newRequestValidationError(c, http.StatusBadRequest, errors.New( "missing entries"))
	}

	for _, x := range *p {
		if err := c.Validate(x); err != nil {
			logger.Error("validation error", zap.String("trace", err.Error()))
			return newRequestValidationError(c, http.StatusBadRequest, err)
		}
	}

	if err := h.usecase.AddSurveyQuestions(c.Request().Context(), *p); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.String(http.StatusOK, "success")
}

func (h *RestHandler) HandleUpdateSurveyQuestion(c echo.Context) error {
	p := new(domain.SurveyQuestion)
	if err := bindAndValidateRequestBody(c, p); err != nil {
		logger.Error("validation error", zap.String("trace", err.Error()))
		return newRequestValidationError(c, http.StatusBadRequest, err)
	}

	if err := h.usecase.UpdateSurveyQuestion(c.Request().Context(), *p); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.String(http.StatusOK, "success")
}
