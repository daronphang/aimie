package usecase

import (
	"aimie-go/internal/domain"
)

type UseCaseService struct {
	Repository 			domain.ExtRepo
}

func NewUseCaseService(repo domain.ExtRepo) *UseCaseService {
	return &UseCaseService{Repository: repo}
}
