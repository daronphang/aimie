package domain

import (
	"context"
)

type ExtRepo interface {
	Repository
	ExecWithTx(ctx context.Context, cb func(Repository) (interface{}, error)) func() (interface{}, error)
}

type Repository interface {
	GetSurveyQuestions(ctx context.Context) ([]SurveyQuestion, error) 
	AddSurveyQuestions(ctx context.Context, arg []SurveyQuestion) error
	UpdateSurveyQuestion(ctx context.Context, arg SurveyQuestion) error 
	AddSurveyResponse(ctx context.Context, arg []SurveyEntry) error 
	GetSurveyResponses(ctx context.Context) ([]SurveyEntry, error)
}