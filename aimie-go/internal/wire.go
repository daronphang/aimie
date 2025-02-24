//go:build wireinject

package internal

import (
	"aimie-go/internal/config"

	"github.com/google/wire"
	"go.uber.org/zap"
)

func WireLogger() (*zap.Logger, error) {
	wire.Build(config.ProvideConfig, config.ProvideLogger)
	return &zap.Logger{}, nil
}


