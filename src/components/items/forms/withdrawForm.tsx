import React from 'react'

import styles from './forms.module.css'
import Item, { onItemWithdraw } from 'utils/models/items'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { Movement } from '../itemMovement'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'

interface WithdrawProps {
  item? : Item
  onSubmit : SubmitHandler<onItemWithdraw>,
  showFormHandler? : (value: React.SetStateAction<Movement>) => void;
}

const Withdraw = (props : WithdrawProps) => {

    const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm<onItemWithdraw>()

return (
    <div className={styles.formContainer}>
      <Box
        component="form"
        className={styles.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(props.onSubmit)}
      >
        <h2 className={styles.formTitle}>Retirar stock para el Item <span>{props.item?.name.toUpperCase()}</span></h2>
        <Stack direction='column' alignItems='center' spacing={4}>
          <FormControl sx={{width : 300}}>
            <TextField
              {...register("amount", { required : 'Este campo es requerido'})}
              error={errors.amount ? true : undefined}
              helperText={errors.amount?.message}
              label={`Cantidad (${props.item?.unit})`}
              variant='outlined'
            />
          </FormControl>
          <p className={styles.warning}>Recordar que una vez retirado, para volver a retirar se debe confirmar el previo retiro.</p>
        </Stack>
        <ButtonGroup
          className={styles.buttonGroup}
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
         <Button type={'submit'} variant='contained'>Retirar</Button>
         <Button type={'button'} onClick={() => props.showFormHandler?.({show : false})} variant='outlined'>Cancelar</Button>
        </ButtonGroup>
      </Box>
    </div>
  )
}

export default Withdraw