package repository

import (
	"aimie-go/internal/domain"
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

func (q *Querier) GetSurveyQuestions(ctx context.Context) ([]domain.SurveyQuestion, error) {
	stmt := `
	SELECT question_id, question
	FROM survey_question
	ORDER BY question_id ASC
	`

	rows, err := q.db.Query(ctx, stmt)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	var items []domain.SurveyQuestion
	for rows.Next() {
		var i domain.SurveyQuestion
		if err := rows.Scan(
			&i.QuestionID,
			&i.Question,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	
	return items, nil
}

func (q *Querier) AddSurveyQuestions(ctx context.Context, arg []domain.SurveyQuestion) error {
	var rows [][]interface{}
	for _, q := range arg {
		rows = append(rows, []interface{}{q.QuestionID, q.Question})
	}

	_, err := q.db.CopyFrom(
		ctx,
		pgx.Identifier{"survey_question"},
		[]string{"question_id", "question"},
		pgx.CopyFromRows(rows),
	)
	if err != nil {
		return err
	}
	return nil
}

func (q *Querier) UpdateSurveyQuestion(ctx context.Context, arg domain.SurveyQuestion) error {
	stmt := `
	UPDATE survey_question
	SET question = $1
	WHERE question_id = $2
	`
	_, err := q.db.Exec(ctx, stmt, arg.Question, arg.QuestionID)
	if err != nil {
		return err
	}
	return nil
}

func (q *Querier) AddSurveyResponse(ctx context.Context, arg []domain.SurveyEntry) error {
	var rows [][]interface{}
	id := uuid.NewString()
	for _, e := range arg {
		rows = append(rows, []interface{}{id, e.QuestionID, e.Response})
	}

	_, err := q.db.CopyFrom(
		ctx,
		pgx.Identifier{"survey_response"},
		[]string{"id", "question_id", "response"},
		pgx.CopyFromRows(rows),
	)
	if err != nil {
		return err
	}
	return nil
}

func (q *Querier) GetSurveyResponses(ctx context.Context) ([]domain.SurveyEntry, error) {
	stmt := `
	SELECT SR.id, SR.question_id, SQ.question, SR.response
	FROM survey_response AS SR
	LEFT JOIN survey_question AS SQ ON SQ.question_id = SR.question_id
	ORDER BY SR.id, SR.question_id ASC
	`

	rows, err := q.db.Query(ctx, stmt)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	var items []domain.SurveyEntry
	for rows.Next() {
		var i domain.SurveyEntry
		if err := rows.Scan(
			&i.ID,
			&i.QuestionID,
			&i.Question,
			&i.Response,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	
	return items, nil
}
