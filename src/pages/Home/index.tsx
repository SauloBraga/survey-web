import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'

import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

interface SurveyType {
  id: string;
  name: string;
  description: string;
  createdBy: {
    id: string;
    name: string;
    document: string;
  }
}

export function Home() {
  const [surveys, setSurveys] = useState<SurveyType[]>([]);
  const [surveysCount, setSurveysCount] =useState(0);
  const [pagination, setPagination] = useState({
    pageSize: 5,
    page: 0
  })
  const navigate = useNavigate()
  const { user } = useAuth()

  async function answerSurvey(state: any) {
    navigate('/answer', {state})
  }

  async function editSurvey(state: any){
    navigate('/new', {state})

  }

  async function deleteUser(id: GridRowId) {
    await api.delete(`surveys/${id}`)
    const newSurvey = surveys.filter(survey => survey.id !== id)
    setSurveys([...newSurvey])
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Questionario', flex: 1, sortable: true},
    { field: 'description', headerName: 'Descrição', flex: 1, sortable: true},
    { field: 'actions', type: 'actions', flex: 0.5, getActions: (params) => { 
      const actions = [];

      const answerButton = <GridActionsCellItem
        icon={<QuestionAnswerIcon />}
        label="Answer"
        onClick={() => answerSurvey(params.row)}
      />

      const editButton = <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        onClick={() => editSurvey(params.row)}
      />

      const deleteButton = <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => deleteUser(params.id)}
      />

      actions.push(answerButton)
      if(params.row.createdBy.id === user) {
        actions.push(editButton)
        actions.push(deleteButton)
      }

      return actions 
    }}
  ]
  

  async function getSurveys() {
    const { data } = await api.get('surveys', {
      params: {
        take: pagination.pageSize,
        skip: pagination.page * pagination.pageSize
      }
    })
    setSurveys(data.surveys)
    setSurveysCount(data.total)
  }
  useEffect(() =>{
    getSurveys();
  }, [pagination])
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingBlock: 2 }}>
      <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Link to="/new">
          <Button variant="contained">Novo Questionario</Button>
        </Link>
      </Box>
      <DataGrid 
        rows={surveys} 
        columns={columns} 
        paginationMode="server" 
        paginationModel={pagination} 
        onPaginationModelChange={setPagination} 
        rowCount={surveysCount} 
        pageSizeOptions={[5, 10]}
        disableColumnMenu
        disableRowSelectionOnClick
      />
    </Box>
  )
}