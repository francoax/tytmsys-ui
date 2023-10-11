import { Box, Button, ButtonGroup, FormControl, Stack, TextField } from '@mui/material'
import React from 'react'

import styles from './forms.module.css'
import Item from 'utils/models/items'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from 'utils/redux/hooks'
import { confirmWithdraw, updateItemInfo } from 'utils/redux/thunks/itemsThunks'

type PropsConfirm = {
  item? : Item,
  displayHandler? : (value: React.SetStateAction<{show : boolean, id? : number}>) => void,
  id? : number
}

type onConfirmWithdraw = {
  realAmountUsed : number
}

const ConfirmWithdraw = (props : PropsConfirm) => {

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm<onConfirmWithdraw>()

  const handleSubmitForm : SubmitHandler<onConfirmWithdraw> = (data) => {
    dispatch(confirmWithdraw({ id : props.id, realAmountUsed : data.realAmountUsed}))
    props.displayHandler?.({show : false})
    dispatch(updateItemInfo(props.item?.id ? props.item.id : 0))
  }

  return (
    <div className={styles.formContainer}>
      <Box
        component="form"
        className={styles.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <h2 className={styles.formTitle}>Confirmar retiro de stock para <span>{props.item?.name.toUpperCase()}</span></h2>
        <Stack direction='column' alignItems='center' spacing={8}>
          <FormControl sx={{width : 300}}>
            <TextField
              {...register("realAmountUsed", { required : 'Este campo es requerido'})}
              error={errors.realAmountUsed ? true : undefined}
              helperText={errors.realAmountUsed?.message}
              label={`Cantidad real usada (${props.item?.unit})`}
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
         <Button type={'submit'} variant='contained'>Confirmar</Button>
         <Button type={'button'} variant='outlined' onClick={() => props.displayHandler?.({ show : false})}>Cancelar</Button>
        </ButtonGroup>
      </Box>
    </div>
  )
}

export default ConfirmWithdraw