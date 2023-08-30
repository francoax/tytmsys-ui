import React, { useEffect, useState } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { ItemAgent } from 'utils/models/items'

import BackButton from 'components/common/buttons/backButton'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import CategoriesService from 'utils/services/categoriesService'
import Categories from 'utils/models/categories'
import axios from 'axios'
import UnitsService from 'utils/services/unitsService'
import Unit from 'utils/models/units'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import ItemsService from 'utils/services/itemsService'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { getCategories } from 'utils/redux/thunks/categoriesThunks'

const NewItem = () => {

  const categoryStore = useAppSelector((state) => state.categories)

  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState(true)
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
    dispatch(getCategories())
    axios.all([
      UnitsService.getUnits()
    ])
    .then(axios.spread((Units) => {
      setLoading(false)
      // setUnits(Units.data.data)
    }))
  }, [dispatch])

  const onSubmit : SubmitHandler<ItemAgent> = (data) => {
    console.log(data)
    ItemsService.createItem(data)
  }

  if(loading) {
    return <>Loading..</>
  }

  return (
    <>
      <BackButton />
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack direction="row" spacing={15}>
          <FormControl sx={{width : 300}}>
            <TextField
              {...register("name", { required : 'Este campo es requerido'})}
              error={errors.name ? true : undefined}
              helperText={errors.name?.message}
              id="outlined-basic" label="Nombre"
              variant="outlined"
            />
          </FormControl>
          {!loading ?
          (
            <>
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
            </>
          ) : 'loading...'
        }
        </Stack>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
         <Button type={'submit'}>Agregar</Button>
        </ButtonGroup>
      </Box>
    </>
  )
}

export default NewItem