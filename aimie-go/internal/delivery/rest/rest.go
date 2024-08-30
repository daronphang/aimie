package rest

import (
	api "aimie-go/internal/delivery/rest/api/v1"
	rh "aimie-go/internal/delivery/rest/handler"
	cm "aimie-go/internal/delivery/rest/middleware"

	uc "aimie-go/internal/usecase"
	cv "aimie-go/internal/validator"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.uber.org/zap"
)

type RestServer struct {
	Echo *echo.Echo
}

func New(logger *zap.Logger, uc *uc.UseCaseService) *RestServer {
	// Create server.
	e := echo.New()

	// Register middlewares.
	e.Use(
		middleware.CORS(),
		cm.CustomRequestLogger(logger),
	)

	// Register custom handlers.
	e.Validator = cv.ProvideValidator()

	// Create handler.
	rh := rh.NewRestHandler(uc)

	// Register routes.
	baseGroup := e.Group("/api/v1")
	api.RegisterBaseRoutes(baseGroup, rh)

	surveyGroup := baseGroup.Group("/survey")
	api.RegisterSurveyRoutes(surveyGroup, rh)

	return &RestServer{
		Echo: e,
	}
}