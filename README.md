# stackoverflow

API
...

| Routes                           | Method | Description
| -------------------------------------------------------------------------------------
| /api/register                    | POST   | Register a new username and password
| /api/login                       | POST   | Check authentication
| /api/questions                   | GET    | Get all questions and referred answers
| /api/questions/:id               | GET    | Get a Question and All Answers of a Question
| /api/questions                   | POST   | Create a new question
| /api/questions/:q_id             | PUT    | Update a question
| /api/questions/:q_id             | DELETE | Delete a question
| /api/questions/:q_id/upvote      | POST   | Up vote a question
| /api/questions/:q_id/downvote    | POST   | Down vote a question
| /api/answers/:q_id               | POST   | Create a new answer for a question
| /api/answers/:a_id               | PUT    | Edit an answer
| /api/answers/:a_id               | DELETE | Delete an answer
| /api/answers/:a_id/upvote        | POST   | Up vote an answer
| /api/answers/:a_id/downvote      | POST   | Down vote an answer


Model:

Users: username, password
Questions: user, title, content, answer:array, vote(username, stance)
Answers: user, question, title, content, vote (username, stance)
