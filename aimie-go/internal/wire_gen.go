// Code generated by Wire. DO NOT EDIT.

//go:generate go run -mod=mod github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package internal

import (
	"aimie-go/internal/config"
	"go.uber.org/zap"
)

// Injectors from wire.go:

func WireLogger() (*zap.Logger, error) {
	configConfig, err := config.ProvideConfig()
	if err != nil {
		return nil, err
	}
	logger, err := config.ProvideLogger(configConfig)
	if err != nil {
		return nil, err
	}
	return logger, nil
}
