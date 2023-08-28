import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks';

import styles from './items.module.css'
import { useNavigate } from 'react-router-dom';
import { Item } from 'utils/interfaces/items';
import { setModalContent, showModal } from 'utils/redux/slices/modalSlice';
import { useEffect, useState } from 'react';
import { getItems } from 'utils/redux/slices/itemSlice';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';
import { getCategories } from 'utils/services/categoriesService';
import Categories from 'utils/interfaces/categories';

export default function BasicTable() {

  const {list, isLoading} = useAppSelector((state) => state.items)

  const [filter, setFilter] = useState<Item[]>(list)

  const [categoryForFilter, setCategoryFilter] = useState<string>()

  const [categories, setCategories] = useState<Categories>()

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getItems())

    const set = async () => {
      const data = await getCategories()

      setCategories(data)
    }

    set()
  }, [dispatch])

  if(isLoading) {
    return <h1>Loading ...</h1>
  }

  const filterList = (event : SelectChangeEvent) => {

    setCategoryFilter(event.target.value as string)

    const filtered = list.filter((item) => item.category === event.target.value as string)

    setFilter(filtered)
  }

  const deleteItem = (item : Item) => {
    dispatch(showModal())

    dispatch(setModalContent({
      title : `Eliminar ${item.name}`,
      message : 'Estas seguro de que lo queres eliminar ?',
      action : ''
    }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.listButtons}>
        <Button sx={{ marginBottom : '2em'}} variant='contained'>Añadir nuevo producto</Button>
        <Box sx={{ minWidth : 350}}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filtrar por categoria</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categoryForFilter}
            label="Filtrar por categoria"
            onChange={filterList}
          >
            {categories?.data.map((cat, index) => (
              <MenuItem key={index} value={cat.name}>{cat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
      </div>
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
                    <Button onClick={() => deleteItem(item)} sx={{ backgroundColor : '#b90e0a', marginLeft : ''}}>Eliminar</Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell><Button onClick={() => navigate(`/${item.id}`)}>Ver detalles</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}