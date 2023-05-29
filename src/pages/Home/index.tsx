import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'

import { api } from "../../services/api";

export function Home() {
  const [surveys, setSurveys] = useState([]);
  const [surveysCount, setSurveysCount] =useState(0);
  const [pagination, setPagination] = useState({
    pageSize: 5,
    page: 0
  })

  async function deleteUser(id: GridRowId) {
    await api.delete(`surveys/${id}`)
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Questionario', flex: 0.3, sortable: true},
    { field: 'description', headerName: 'Descrição', flex: 1, sortable: true},
    { field: 'actions', type: 'actions', getActions: (params) => [
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => deleteUser(params.id)}
      />,
    ]}
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