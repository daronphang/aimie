package usecase

import (
	"aimie-go/internal/domain"
	"context"
)

func (uc *UseCaseService) GetSurveyQuestions(ctx context.Context) ([]domain.SurveyQuestion, error) {
	rv, err := uc.Repository.GetSurveyQuestions(ctx)
	if err != nil {
		return nil, err
	}
	if rv == nil {
		rv = make([]domain.SurveyQuestion, 0)
	}
	return rv, nil
}

func (uc *UseCaseService) AddSurveyQuestions(ctx context.Context, arg []domain.SurveyQuestion) error {
	if err := uc.Repository.AddSurveyQuestions(ctx, arg); err != nil {
		return err
	}
	return nil
}

func (uc *UseCaseService) UpdateSurveyQuestion(ctx context.Context, arg domain.SurveyQuestion) error {
	if err := uc.Repository.UpdateSurveyQuestion(ctx, arg); err != nil {
		return err
	}
	return nil
}

func (uc *UseCaseService) SaveSurveyResponse(ctx context.Context, arg []domain.SurveyEntry) error {
	if err := uc.Repository.AddSurveyResponse(ctx, arg); err != nil {
		return err
	}
	return nil
}

func (uc *UseCaseService) GetSurveyResponses(ctx context.Context) error {
	return nil
}