CREATE TABLE survey_question (
    question_id VARCHAR(255) PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE survey_response (
    id VARCHAR(255) PRIMARY KEY,
    question_id VARCHAR(255) NOT NULL,
    response VARCHAR(255) NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    FOREIGN KEY (question_id) REFERENCES survey_question(question_id)
);
