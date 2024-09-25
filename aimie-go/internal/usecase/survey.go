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

func (uc *UseCaseService) GetSurveyResponses(ctx context.Context) ([]domain.SurveyUserResponse, error) {
	res, err := uc.Repository.GetSurveyResponses(ctx)
	if err != nil {
		return nil, err
	}

	rv := make([]domain.SurveyUserResponse, 0)
	for _, row := range res {
		entry := domain.SurveyEntry{
			ID: row.ID,
			QuestionID: row.QuestionID,
			Question: row.Question,
			Response: row.Response,
		}
		if len(rv) > 0 && rv[len(rv)-1].ID == row.ID {
			last := &rv[len(rv)-1]
			last.Responses = append(last.Responses, entry)
		} else {
			temp := domain.SurveyUserResponse{
				ID: row.ID,
				Responses: make([]domain.SurveyEntry, 0),
			}
			temp.Responses = append(temp.Responses, entry)
			rv = append(rv, temp)
		}
	}
	return rv, nil
}