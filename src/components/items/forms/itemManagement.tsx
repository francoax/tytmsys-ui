import React, { useEffect, useState } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { ItemAgent } from 'utils/models/items'

import styles from './forms.module.css'
import { Theme, useTheme } from '@mui/material/styles';

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
import OutlinedInput from '@mui/material/OutlinedInput'
import Chip from '@mui/material/Chip'
import axios from 'axios';
import SuppliersService from 'utils/services/suppliersService';
import Supplier from 'utils/models/supplier';


function getStyles(name: string, suppliers: readonly Supplier[], theme: Theme) {
  return {
    fontWeight:
      suppliers.indexOf(suppliers?.find((s) => s.name === name) as Supplier) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type ManagementProps = {
  showHandler? : (value: React.SetStateAction<boolean>) => void,
  use? : string
}

const ItemManagement = ({showHandler, use} : ManagementProps) => {
  const theme = useTheme();

  const dispatch = useAppDispatch()
  const categoryStore = useAppSelector((state) => state.categories)
  const [loadingUnits, setLoadingUnits] = useState(true)
  const [units, setUnits] = useState<Unit[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

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

  const {
    field : sups
  } = useController({ control : control, name : 'suppliers', rules : { required: 'Este campo es requerido'}})

  useEffect(() => {
    axios.all([
      UnitsService.getUnits(),
      SuppliersService.getSuppliers()
    ]).then(([Units, Suppliers ]) => {
      setUnits(Units.data.data as Unit[])
      setSuppliers(Suppliers.data.data as Supplier[])
      setLoadingUnits(false)
    }).catch((err) => {
      console.log(err)
    })
  }, [dispatch])

  const onSubmit : SubmitHandler<ItemAgent> = (data) => {
    const objectables = data.suppliers?.map((s) => ({ supplierId : s.valueOf() as number }))
    data.suppliers = objectables

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
          <FormControl sx={{ width: 300 }} error={errors.suppliers ? true : undefined}>
            <InputLabel id="demo-multiple-chip-label">Proveedores</InputLabel>
            <Select
              {...sups}
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={sups.value || []}
              onChange={(e) => sups.onChange(e.target.value)}
              input={<OutlinedInput id="select-multiple-chip" label="Proveedores" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected?.map((value, index) => (
                    <Chip key={index} label={value.toString()} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {suppliers.map((sup, index) => (
                <MenuItem
                  key={index}
                  value={sup.id}
                  style={getStyles(sup.name, suppliers, theme)}
                >
                  {sup.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.suppliers?.message}</FormHelperText>
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