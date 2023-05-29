import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../../services/api';

interface SurveyType {
  id: string;
  name: string;
  description: string;
  questions: {
    id: string;
    description: string;
  }[]
}

interface AnswerType {
  questionId: string;
  description: string;
}

export function AnswerSurvey() {
  const { state } = useLocation()
  const [answers, setAnswers] = useState<AnswerType[]>([])
  const survey = state as SurveyType

  function handleAnswerChange(event: any, index: number, questionId: string) {
    event.preventDefault()

    setAnswers(a => {
      const newAnswers = a.slice()
      newAnswers[index] = { questionId, description: event.target.value }
    
      
      return newAnswers
    })
  }

  async function handleSubmit(event: any) {
    event.preventDefault()

    await api.post(`surveys/${survey.id}/answers`, { answers })
  }
  return (
    (!state) ? 
      <Navigate to="/" />
    :
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant='h3' >{survey.name}</Typography>
        <Typography variant='subtitle1'>{survey.description}</Typography>
        <Divider/>
        <Box>
          {
            survey
              .questions
              .map((question, index) => (
                <Box key={question.id}>
                  <Typography>{question.description}</Typography>
                  <TextField
                    type="text"
                    onChange={(event) => handleAnswerChange(event, index, question.id)}
                    variant="outlined"
                    fullWidth 
                  />
                </Box>))
          }
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Link to="/">
            <Button>Voltar</Button>
          </Link>
          <Button type="submit" variant="contained">Salvar</Button>
        </Box>
      </Box>
    )

}