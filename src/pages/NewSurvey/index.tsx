import { Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material";
import AddBox from '@mui/icons-material/AddBox'
import Delete from '@mui/icons-material/Delete'

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

interface QuestionType {
  id?: string;
  description: string;
}

export function NewSurvey() {
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(() => {
    if(state) {
      setIsEdit(true);
      setName(state.name)
      setDescription(state.description)
      setQuestions(state.questions)
    }
  }, [state])

  function addAnswer() {
    setQuestions([...questions, { description: ''}])
  }

  function removeAnswer(index: number) {
    const newAnswers = questions.slice()

    newAnswers.splice(index,1)

    setQuestions([...newAnswers])
  }

  function handleQuestionChange(event: any, index: number) {
    event.preventDefault()

    setQuestions(a => {
      const newAnswers = a.slice()
      newAnswers[index].description = event.target.value

      return newAnswers
    })
  }

  async function handleSubmit(event:any) {
    event.preventDefault()

    if(isEdit){
      console.log(questions)
      await api.put(`surveys/${state.id}`, { name, description, questions })
    } else {
      const questionsToSend = questions.map(q=> q.description);
      await api.post('surveys',{name, description, questions: questionsToSend})
    }
    navigate('/')
  }
  return (
    <Box component="form" onSubmit={handleSubmit}  sx={{
      p: 2,
      display: 'flex',
      gap: 2,
      flexDirection: 'column'
    }}>
      <Typography variant="h2" sx={{fontSize: '32px' }}>Novo Questionário </Typography>
      <Divider />
      <Box  sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <TextField
          label="Nome"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Descrição"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          variant="outlined"
          fullWidth
          multiline
          minRows={3}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography>Perguntas</Typography>
            <IconButton onClick={addAnswer}>
              <AddBox/>
            </IconButton>
          </Box>
          {questions.map((question, index) => 
            <Box key={index} sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField   
                key={index}      
                type="text"
                variant="outlined"
                value={question.description}
                onChange={(event) => handleQuestionChange(event, index)}
                fullWidth
              />
              <IconButton onClick={() => {removeAnswer(index)}}>
                <Delete />
              </IconButton>
            </Box>
          )}
        </Box>
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