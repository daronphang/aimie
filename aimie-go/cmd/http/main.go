package main

import (
	"aimie-go/internal"
	"aimie-go/internal/config"
	"aimie-go/internal/delivery/rest"
	"aimie-go/internal/repository"
	"aimie-go/internal/usecase"
	"context"
	"fmt"
	"os"
	"os/signal"
	"time"

	"go.uber.org/zap"
)

var logger *zap.Logger

func main() {
	ctx := context.Background()
	// Create config.
	cfg, err := config.ProvideConfig()
	if err != nil {
		panic(fmt.Sprintf("error reading config file: %v", err))
    }

	// Create logger.
	logger, err = internal.WireLogger()
	if err != nil {
		logger.Fatal("error setting up logger", zap.String("trace", err.Error()))
    }

	// Setup DB.
	if err := repository.SetupDB(ctx, cfg); err != nil {
		logger.Fatal("error setting up DB", zap.String("trace", err.Error()))
	}

	// Create db dependency.
	db, err := repository.New(ctx, cfg)
	if err != nil {
		logger.Fatal("error creating db", zap.String("trace", err.Error()))
	}

	// Create usecase with dependencies.
	uc := usecase.NewUseCaseService(db)

	// Create server.
	s := rest.New(logger, uc)

	// Run server.
	go func() {
		fmt.Printf("starting REST server in port %v", cfg.Port)
		if err := s.Echo.Start(fmt.Sprintf(":%v", cfg.Port)); err != nil {
			gracefulShutdown(ctx, s, db)
			logger.Fatal("failed to start REST server", zap.String("trace", err.Error()))
		}
	}()

	// Create ctx for listening to SIGINT and SIGTERM
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()

	// Wait for interrupt signal to gracefully shutdown the server with a timeout.
	<-ctx.Done()
	_, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	gracefulShutdown(ctx, s, db)
}

func gracefulShutdown(ctx context.Context, s *rest.RestServer, db *repository.Querier) {
	fmt.Println("performing graceful shutdown...")

	if err := s.Echo.Shutdown(ctx); err != nil {
		logger.Error("failed to shutdown REST server", zap.String("trace", err.Error()))
	}

	db.Close()
}