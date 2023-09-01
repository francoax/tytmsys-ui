import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Supplier from 'utils/models/supplier'

type ListProps = {
  suppliers : Supplier[]
}

const ListOfSuppliers = ({ suppliers } : ListProps) => {

  const navigate = useNavigate()

  return (
    <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight : 600}}>ID</TableCell>
                <TableCell sx={{ fontWeight : 600}}>NOMBRE</TableCell>
                <TableCell sx={{ fontWeight : 600}}>CATEGORIA&nbsp;</TableCell>
                <TableCell sx={{ fontWeight : 600}}>STOCK ACTUAL&nbsp;</TableCell>
                <TableCell align='center' sx={{ fontWeight : 600}}>OPCIONES</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers?.map((supplier, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{supplier.id}</TableCell>
                  <TableCell>{supplier.name}</TableCell>
                  {/* <TableCell>{supplier.category}</TableCell> */}
                  {/* <TableCell align='left' sx={{ fontWeight : 700 }}>{supplier.actualStock} {supplier.unit}</TableCell> */}
                  <TableCell align='center'>
                    <ButtonGroup sx={{'boxShadow' : 'none'}} variant="contained" aria-label="outlined primary button group">
                      <Button onClick={() => navigate(`/${supplier.id}/agregarStock`)} sx={{ backgroundColor : '#028a0f'}}>Agregar stock</Button>
                      <Button onClick={() => navigate(`/${supplier.id}/retirarStock`)} sx={{ margin : '0 2em', backgroundColor : '#dd571c'}}>Retirar stock</Button>
                      {/* <Button onClick={() => props.deletesupplier(supplier)} sx={{ backgroundColor : '#b90e0a', marginLeft : ''}}>Eliminar</Button> */}
                    </ButtonGroup>
                  </TableCell>
                  <TableCell><Button onClick={() => navigate(`/${supplier.id}`)}>Ver detalles</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  )
}

export default ListOfSuppliers