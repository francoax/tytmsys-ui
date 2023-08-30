import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Item from 'utils/models/items'
import { useAppSelector } from 'utils/redux/hooks'

type ListProps = {
  deleteItem : (item : Item) => void
}

const ListOfItems = (props : ListProps) => {

  const itemStore = useAppSelector((state) => state.items)
  const categoryStore = useAppSelector((state) => state.categories)

  const [filter, setFilter] = useState<Item[]>()

  useEffect(() => {
    setFilter(itemStore.list)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filterList = (event : SelectChangeEvent) => {
    if(event.target.value === 'todos') {
      setFilter(itemStore.list)
      return
    }
    setFilter(itemStore.list.filter((item) => item.category === event.target.value))
  }

  const navigate = useNavigate()
  return (
    <>
      <Stack direction='row' spacing={15} sx={{ padding : '2em 0'}}>
          <Button onClick={() => navigate('/nuevoProducto')} variant='contained'>Añadir nuevo producto</Button>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Filtrar por categoria</InputLabel>
            <Select
              sx={{ minWidth : 350}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={''}
              label="Filtrar por categoria"
              onChange={filterList}
            >
              <MenuItem value={'todos'}>Todos</MenuItem>
              {categoryStore.list?.map((cat, index) => (
                <MenuItem key={index} value={cat.name}>{cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
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
              {filter?.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell align='left' sx={{ fontWeight : 700 }}>{item.actualStock} {item.unit}</TableCell>
                  <TableCell align='center'>
                    <ButtonGroup sx={{'boxShadow' : 'none'}} variant="contained" aria-label="outlined primary button group">
                      <Button onClick={() => navigate(`/${item.id}/agregarStock`)} sx={{ backgroundColor : '#028a0f'}}>Agregar stock</Button>
                      <Button onClick={() => navigate(`/${item.id}/retirarStock`)} sx={{ margin : '0 2em', backgroundColor : '#dd571c'}}>Retirar stock</Button>
                      <Button onClick={() => props.deleteItem(item)} sx={{ backgroundColor : '#b90e0a', marginLeft : ''}}>Eliminar</Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell><Button onClick={() => navigate(`/${item.id}`)}>Ver detalles</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
  )
}

export default ListOfItems