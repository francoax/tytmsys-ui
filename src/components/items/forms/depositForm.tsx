import React from 'react'

import styles from './forms.module.css'
import Button from '@mui/material/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import Item, { onItemDeposit } from 'utils/models/items'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import ButtonGroup from '@mui/material/ButtonGroup'
import { Movement } from '../itemMovement'

type DepositProps = {
  item? : Item,
  onSubmit : SubmitHandler<onItemDeposit>,
  showFormHandler? : (value: React.SetStateAction<Movement>) => void;
}

const Deposit = (props : DepositProps) => {

    const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm<onItemDeposit>()

  return (
    <div className={styles.formContainer}>
      <Box
        component="form"
        className={styles.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(props.onSubmit)}
      >
        <h2 className={styles.formTitle}>Agregar stock para el Item <span>{props.item?.name.toUpperCase()}</span></h2>
        <Stack direction='column' alignItems='center' spacing={8}>
          <FormControl sx={{width : 300}}>
            <TextField
              {...register("amount", { required : 'Este campo es requerido'})}
              error={errors.amount ? true : undefined}
              helperText={errors.amount?.message}
              label={`Cantidad (${props.item?.unit})`}
              variant='outlined'
            />
          </FormControl>
          <FormControl sx={{width : 300}}>
            <TextField
              {...register("dollarAtDate", { required : 'Este campo es requerido'})}
              error={errors.amount ? true : undefined}
              helperText={errors.dollarAtDate?.message}
              label="Dolar a la fecha U$S"
              variant='outlined'
            />
          </FormControl>
          <FormControl sx={{width : 300}}>
            <TextField
              {...register("totalPrice", { required : 'Este campo es requerido'})}
              error={errors.amount ? true : undefined}
              helperText={errors.totalPrice?.message}
              label="Precio total por ingreso"
              variant='outlined'
            />
          </FormControl>
        </Stack>
        <ButtonGroup
          className={styles.buttonGroup}
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
         <Button type={'submit'} variant='contained'>Agregar</Button>
         <Button type={'button'} onClick={() => props.showFormHandler?.({show : false})} variant='outlined'>Cancelar</Button>
        </ButtonGroup>
      </Box>
    </div>
  )
}

export default Deposit