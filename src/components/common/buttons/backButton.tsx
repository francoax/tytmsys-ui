import Button from '@mui/material/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <Button onClick={() => navigate(-1)} variant='contained'>Volver</Button>
  )
}

export default BackButton