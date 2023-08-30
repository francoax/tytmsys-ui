import React, { useEffect, useState } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { ItemAgent } from 'utils/models/items'

import styles from './forms.module.css'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import Unit from 'utils/models/units'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import UnitsService from 'utils/services/unitsService'
import { postItem } from 'utils/redux/thunks/itemsThunks'

type ManagementProps = {
  showHandler? : (value: React.SetStateAction<boolean>) => void,
  use? : string
}

const ItemManagement = ({showHandler, use} : ManagementProps) => {

  const dispatch = useAppDispatch()
  const categoryStore = useAppSelector((state) => state.categories)
  const [loadingUnits, setLoadingUnits] = useState(true)
  const [units, setUnits] = useState<Unit[]>()

  const {
    register,
    handleSubmit,
    formState : {errors},
    control
  } = useForm<ItemAgent>({
    mode : 'onChange',
  })

  const {
    field : category
  } = useController({ control : control, name : 'categoryId', rules : { required: 'Este campo es requerido'}})

  const {
    field : unit
  } = useController({ control : control, name : 'unitId', rules : { required: 'Este campo es requerido'}})

  useEffect(() => {
    UnitsService.getUnits().then(({ data }) => {
      setLoadingUnits(false)
      setUnits(data.data as Unit[])
    })
  }, [dispatch])

  const onSubmit : SubmitHandler<ItemAgent> = (data) => {
    showHandler?.(false)
    dispatch(postItem(data))
  }

  if(loadingUnits) {
    return <>Loading..</>
  }

  return (
    <div className={styles.formContainer}>
      {use === 'create'
      ?
      <Box
        component="form"
        sx={{
          // '& > :not(style)': { m: 1 },
        }}
        className={styles.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className={styles.formTitle}>Crear nuevo producto</h2>
        <Stack direction="row" justifyContent={'center'} sx={{minHeight : '90px'}} spacing={8}>
          <FormControl sx={{width : 300}}>
            <TextField
              {...register("name", { required : 'Este campo es requerido'})}
              error={errors.name ? true : undefined}
              helperText={errors.name?.message}
              id="outlined-basic" label="Nombre"
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{width : 300}} error={errors.categoryId ? true : undefined}>
            <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
            <Select
              {...category}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={category.value || ''}
              label="Categoria"
              onChange={(e) => category.onChange(e.target.value)}
            >
              {categoryStore.list.map((cat, index) => (
                <MenuItem key={index} value={cat.id}>{cat.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.categoryId?.message}</FormHelperText>
          </FormControl>
          <FormControl sx={{width : 300}} error={errors.unitId ? true : undefined}>
            <InputLabel id="demo-simple-select-helper-label">Unidad</InputLabel>
            <Select
              {...unit}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={unit.value || ''}
              label="Unidad"
              onChange={(e) => unit.onChange(e.target.value)}
            >
              {units?.map((unit, index) => (
                <MenuItem key={index} value={unit.id}>{unit.description}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.unitId?.message}</FormHelperText>
          </FormControl>
        </Stack>
        <ButtonGroup
          className={styles.buttonGroup}
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
         <Button type={'submit'} variant='contained'>Agregar</Button>
         <Button type={'button'} onClick={() => showHandler?.(false)} variant='outlined'>Cancelar</Button>
        </ButtonGroup>
      </Box>
      :
      'edit'
      }
    </div>
  )
}

export default ItemManagement