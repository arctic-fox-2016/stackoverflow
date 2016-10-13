# Stack over


### user

| Method | URL | Description
|--------|-----|-------------
| GET    | `/api/user`                | Find all user
| GET    | `/api/user/:user_id`       | Find a user
| POST   | `/api/user`                | Create a user
| PUT    | `/api/user/:user_id`       | edit a user profile
| DELETE | `/api/user/:user_id        | Delete a user


### Questions

| Method | URL | Description
|--------|-----|-------------
| GET    | `/api/questions`               | Find all questions
| GET    | `/api/questions/:question_id`  | Find a question
| POST   | `/api/questions`               | Insert a question
| PUT    | `/api/questions/:question_id`  | Update a question title/content
| DELETE | `/api/questions/:question_id`  | Delete a question

### Answers

| Method | URL | Description
|--------|-----|-------------
| POST   | `/api//question/:question_id/answer/:user_id`                | Insert answer for a question
| POST   | `/question/:question_id/answer/:user_id/update/:answer_num`  | Update an answer in the question
| DELETE | `/question/:question_id/answer/:answer_num`                  | Delete an answer in the question

### Votes

| Method | URL | Description
|--------|-----|-------------
| POST   | `/api/question/:question_id/answer/:user_id/upvotes`   | User upvote an answer
| POST   | `/api/question/:question_id/answer/:user_id/downvotes` | User downvote an answer
| POST   | `/api/question/:question_id/upvotes/:user_id`          | User upvote a question
| POST   | `/api/question/:question_id/downvotes/:user_id'`       | User downvote a question
