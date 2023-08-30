import React from 'react'

import styles from '../items.module.css'
import Button from '@mui/material/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import Item, { onItemDeposit } from 'utils/models/items'
import { useNavigate } from 'react-router-dom'

interface DepositProps {
  item? : Item,
  onSubmit : SubmitHandler<onItemDeposit>
}

const Deposit = (props : DepositProps) => {

    const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm<onItemDeposit>()

  const navigate = useNavigate()

  return (
    <form className={styles.form} onSubmit={handleSubmit(props.onSubmit)}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Cantidad a ingresar <span>({props.item?.unit})</span></label>
        <div className={styles.input}>
          <input {...register("amount", {required : 'Este campo es requerido'})} type="text" />
          {errors.amount && <span className={styles.inputError}>{errors.amount.message}</span>}
        </div>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Dolar a la fecha U$S</label>
        <div className={styles.input}>
          <input {...register("dollarAtDate", {required : 'Este campo es requerido'})} type="text" />
          {errors.dollarAtDate && <span className={styles.inputError}>{errors.dollarAtDate.message}</span>}
        </div>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Costo por ingreso $</label>
        <div className={styles.input}>
          <input {...register("totalPrice", {required : 'Este campo es requerido'})} type="text" />
          {errors.totalPrice && <span className={styles.inputError}>{errors.totalPrice.message}</span>}
        </div>
      </div>
      <div className={styles.formButtons}>
        <Button type='submit' variant='contained'>Aceptar</Button>
        <Button onClick={() => navigate(-1)}>Cancelar</Button>
      </div>
    </form>
  )
}

export default Deposit