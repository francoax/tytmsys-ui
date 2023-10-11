import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TopButtons from 'components/common/buttons/topButtonOptions'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Item from 'utils/models/items'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import ItemManagement from './forms/itemManagement'
import ItemMovement, { Movement } from './itemMovement'
import { setModalContent, showModal } from 'utils/redux/slices/modalSlice'
import { deleteItem } from 'utils/redux/thunks/itemsThunks'
import Modal from 'components/common/modal'

import styles from './items.module.css'

const ListOfItems = () => {

  const itemStore = useAppSelector((state) => state.items)
  const categoryStore = useAppSelector((state) => state.categories)
  const modal = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()

  const [showForm, setShowForm] = useState(false)

  const [showMovementForm, setMovementFormView] = useState<Movement>({show : false})


  const [filter, setFilter] = useState<Item[]>()
  const [categoryFiltered, setCategoryFilter] = useState('')

  useEffect(() => {
    setFilter(itemStore.list)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filterList = (event : SelectChangeEvent) => {
    if(event.target.value === 'todos') {
      setCategoryFilter('')
      setFilter(itemStore.list)
      return
    }
    setCategoryFilter(event.target.value)
    setFilter(itemStore.list.filter((item) => item.category === event.target.value))
  }

  const onDelete = (item : Item) => {
    dispatch(showModal())
    dispatch(setModalContent({
      title : `Eliminar ${item.name}`,
      message : 'Estas seguro de querer eliminarlo?',
      action : deleteItem(item.id)
    }))
  }

  const navigate = useNavigate()

  // if(itemStore.list.length < 1) {
  //   return (
  //     <>
  //       <p>No hay productos todavia... ingrese nuevos.</p>
  //     </>
  //   )
  // }
  return (
    <>
      <TopButtons>
        <Button onClick={() => setShowForm(true)} variant='contained'>Añadir nuevo producto</Button>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Filtrar por categoria</InputLabel>
          <Select
            sx={{ minWidth : 350}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={'' || categoryFiltered}
            label="Filtrar por categoria"
            onChange={filterList}
          >
            <MenuItem value={'todos'}>Todos</MenuItem>
            {categoryStore.list?.map((cat, index) => (
              <MenuItem key={index} value={cat.name}>{cat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </TopButtons>
      {itemStore.list.length < 1 ? 'No hay productos todavia... crea nuevos.' : (
        <TableContainer component={Paper} sx={{ maxHeight: '75vh' }}>
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
                  <TableCell align='left' sx={{ fontWeight : 700 }}>
                    {item.actualStock} {item.unit} {item.stockMovements.some(sm => sm.action === 'retiro' && sm.state === 'pendiente') ? <span className={styles.pendient}>Hay un retiro pendiente de {item.stockMovements.find(sm => sm.state === 'pendiente')?.amount} {item.unit}</span> : ''}
                  </TableCell>
                  <TableCell align='center'>
                    <ButtonGroup sx={{'boxShadow' : 'none'}} variant="contained" aria-label="outlined primary button group">
                      <Button onClick={() => setMovementFormView({action : 'add', id : item.id, show: true, displayHandler: setMovementFormView})} sx={{ backgroundColor : '#028a0f'}}>Agregar stock</Button>
                      <Button onClick={() => setMovementFormView({action : 'retire', id : item.id, show: true, displayHandler: setMovementFormView})} sx={{ margin : '0 2em', backgroundColor : '#dd571c'}}>Retirar stock</Button>
                      <Button onClick={() => onDelete(item)} sx={{ backgroundColor : '#b90e0a', marginLeft : ''}}>Eliminar</Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell><Button onClick={() => navigate(`/${item.id}`)}>Ver detalles</Button></TableCell>
                  {modal.isShown && <Modal action={deleteItem(item.id)}/>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {showForm && <ItemManagement showHandler={setShowForm} use='create' />}
      {showMovementForm.show && <ItemMovement {...showMovementForm} />}
    </>
  )
}

export default ListOfItems