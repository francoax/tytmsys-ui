import React from 'react'

import styles from './suppliers.module.css'
import { Box, Button, ButtonGroup, FormControl, Stack, TextField } from '@mui/material'
import { Supplier, SupplierAgent } from 'utils/models/supplier'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from 'utils/redux/hooks'
import { createSupplier, updateSupplier } from 'utils/redux/thunks/suppliersThunks'

type Props = {
  use? : string,
  supToUpdate? : Supplier,
  setForm :(value: React.SetStateAction<{use : string, supToUpdate : Supplier | undefined, show : boolean} | undefined>) => void
}

const SupplierManagement = (props : Props) => {

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState : {errors},
  } = useForm<SupplierAgent>({
    mode : 'onChange',
    defaultValues : {
      id : props.supToUpdate?.id,
      name : props.supToUpdate?.name,
      phone : props.supToUpdate?.phone,
      email : props.supToUpdate?.email,
      direction : props.supToUpdate?.direction
    }
  })

  const onSubmit : SubmitHandler<SupplierAgent> = (data) => {
    if(props.use === 'create') {
      dispatch(createSupplier(data))
    }

    if(props.use === 'edit') {
      dispatch(updateSupplier(data))
    }

    props.setForm({use : '', supToUpdate : undefined, show : false})
  }

  return (
    <div className={styles.formContainer}>
      <Box
        component="form"
        className={styles.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className={styles.formTitle}>{props.use === 'create' ? 'Crear nuevo proveedor' : `Editar proveedor ${props.supToUpdate?.name.toUpperCase()}`}</h2>
        <Stack direction="row" justifyContent={'center'} sx={{minHeight : '90px'}} spacing={8}>
          <Stack direction="column" sx={{minHeight : '90px'}} spacing={8} >
            <FormControl sx={{width : 300}}>
              <TextField
                {...register('name', { required : 'Este campo es requerido'})}
                error={errors.name ? true : undefined}
                helperText={errors.name?.message}
                id="outlined-basic" label="Nombre"
                variant="outlined"
              />
            </FormControl>
            <FormControl sx={{width : 300}}>
              <TextField
                {...register('email')}
                error={errors.email ? true : undefined}
                helperText={errors.email?.message}
                id="outlined-basic" label="Email"
                variant="outlined"
              />
            </FormControl>
            <FormControl sx={{width : 300}}>
              <TextField
                {...register('phone')}
                error={errors.phone ? true : undefined}
                helperText={errors.phone?.message}
                id="outlined-basic" label="Telefono"
                variant="outlined"
              />
            </FormControl>
          </Stack>
          <Stack direction="column" sx={{minHeight : '90px'}} spacing={8}>
            <FormControl sx={{width : 300}}>
              <TextField
                {...register('direction.street')}
                error={errors.direction?.street ? true : undefined}
                helperText={errors.direction?.street?.message}
                id="outlined-basic" label="Calle"
                variant="outlined"
              />
            </FormControl>
            <FormControl sx={{width : 300}}>
              <TextField
                {...register('direction.streetNumber')}
                error={errors.direction?.streetNumber ? true : undefined}
                helperText={errors.direction?.streetNumber?.message}
                id="outlined-basic" label="Altura"
                variant="outlined"
              />
            </FormControl>
            <FormControl sx={{width : 300}}>
              <TextField
                {...register('direction.city')}
                error={errors.direction?.city ? true : undefined}
                helperText={errors.direction?.city?.message}
                id="outlined-basic" label="Ciudad"
                variant="outlined"
              />
            </FormControl>
          </Stack>
        </Stack>
        <ButtonGroup
          className={styles.buttonGroup}
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
         <Button type={'submit'} variant='contained'>{props.use === 'create' ? 'Agregar' : 'Editar'}</Button>
         <Button onClick={() => props.setForm({use : '', supToUpdate : undefined, show : false})} type={'button'} variant='outlined'>Cancelar</Button>
        </ButtonGroup>
      </Box>
    </div>
  )
}

export default SupplierManagement