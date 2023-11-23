import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(bodyParser.json())
app.use(cors())

// Mock Data for GET /api/v1/survey
const surveyData = {
  data: {
    id: '2660dd24-e2db-42c1-8093-284b1df2664c',
    title: 'Film feedback form',
    description:
      '<p>Thank you for participating in the film festival!</p><p>Please fill out this short survey so we can record your feedback.</p>',
    questions: [
      {
        questionId: 'film',
        questionType: 'text',
        label: 'What film did you watch?',
        required: true,
        attributes: null
      },
      {
        questionId: 'review',
        questionType: 'rating',
        label: 'How would you rate the film? (1 - Very bad, 5 - Very good)',
        required: true,
        attributes: {
          min: 1,
          max: 5
        }
      }
    ]
  }
}

let answers = []

// GET /api/v1/survey
app.get('/api/v1/survey', (req, res) => {
  console.log('Received request for /api/v1/survey')
  res.status(200).json(surveyData)
})

// POST /api/v1/survey/:id/answers
app.post('/api/v1/survey/:id/answers', (req, res) => {
  const userAnswers = req.body.data.attributes.answers
  const errors = []

  surveyData.data.questions.forEach((question) => {
    const answer = userAnswers.find((ans) => ans.questionId === question.questionId)
    if (!answer || answer.answer === undefined || answer.answer === null) {
      errors.push({
        source: { pointer: `data/attributes/answers/${question.questionId}` },
        detail: 'The value is required'
      })
    }
  })

  // If there are errors, send a 422 response
  if (errors.length > 0) {
    return res.status(422).json({ errors })
  }
  // Save answers to in-memory array
  answers = {
    surveyId: req.params.id,
    answers
  }

  // Respond with success
  res.status(201).json(answers)
})

// Error handling middleware (based on Attachment 4)
app.use((err, res) => {
  console.error(err.stack)
  res.status(500).json({
    errors: [
      {
        title: 'Internal Server Error',
        detail: "Something went wrong. We're working on it!"
      }
    ]
  })
})

// Error handling middleware
app.use((err, res) => {
  console.error(err.stack)
  res.status(500).json({
    errors: [
      {
        title: 'Internal Server Error',
        detail: "Something went wrong. We're working on it!"
      }
    ]
  })
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
