package domain

type SurveyQuestion struct {
	QuestionID	string	`json:"questionId" validate:"required"` 
	Question	string	`json:"question" validate:"required"` 
}

type SurveyEntry struct {
	ID			string 	`json:"id"`
	QuestionID	string	`json:"questionId" validate:"required"` 
	Question	string	`json:"question"` 
	Response	string	`json:"response"` 
}

type SurveyUserResponse struct {
	ID 			string			`json:"id"`
	Responses 	[]SurveyEntry  	`json:"responses"`
}