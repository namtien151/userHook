import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {DataGrid} from '@mui/x-data-grid';
import axios from 'axios';
function Home() {
  var navigate = useNavigate();
  var dataRegister = JSON.parse(localStorage.getItem('dataRegister') ) ;
  const [dataApi ,setDataApi] = useState([])
  useEffect(() => {
    console.log(dataRegister) ;
    if (!dataRegister) {
      navigate("/register");
    } 
    try {
      const res = axios.get("http://649cf38a9bac4a8e669d1b36.mockapi.io/todolist")
      res.then((data) => setDataApi(data.data)) 
    }
    catch (e) {
      console.log(e)
    }
  },[]);

  const handleLogout = () => {
    localStorage.removeItem('dataRegister');
    navigate("/register");
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fristName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 160,
      
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 160,
      
    },
  ];
  
  return ( 
    <>
    <Box sx = {{display:"flex" , justifyContent:"flex-end" , alignItems:"center" , padding:"20px" }}>
      <Typography sx ={{marginRight:"40px"}}>{dataRegister.firstName }</Typography> 
      <Button onClick={handleLogout} variant="contained">Log Out</Button>
    </Box>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={dataApi}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
    </>
    
  )
}

export default Home