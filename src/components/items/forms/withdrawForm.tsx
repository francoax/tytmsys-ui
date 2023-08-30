import React from 'react'

import styles from '../items.module.css'
import Item, { onItemWithdraw } from 'utils/models/items'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

interface WithdrawProps {
  item? : Item
  onSubmit : SubmitHandler<onItemWithdraw>
}

const Withdraw = (props : WithdrawProps) => {

    const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm<onItemWithdraw>()

  const navigate = useNavigate()

  return (
    <form className={styles.form} onSubmit={handleSubmit(props.onSubmit)}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Cantidad a retirar <span>({props.item?.unit})</span></label>
        <div className={styles.input}>
          <input {...register("amount", {required : 'Este campo es requerido'})} type="text" />
          {errors.amount && <span className={styles.inputError}>{errors.amount.message}</span>}
        </div>
      </div>
      <div>
        <p style={{'fontSize' : '0.8rem'}}>
          Una vez confirmado el retiro, para retirar nuevamente debe confirmarse la cantidad real utilizada.
        </p>
      </div>
      <div className={styles.formButtons}>
        <Button type='submit' variant='contained'>Aceptar</Button>
        <Button onClick={() => navigate(-1)}>Cancelar</Button>
      </div>
    </form>
  )
}

export default Withdraw