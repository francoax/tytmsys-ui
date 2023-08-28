import React from 'react'

import styles from './items.module.css'
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks';
import Button from '@mui/material/Button';
import { setModalContent, showModal } from 'utils/redux/slices/modalSlice';
import { addStock, retireStock } from 'utils/redux/slices/itemSlice';
import { SubmitHandler } from 'react-hook-form';
import { onDeposit, onWithdraw } from 'utils/interfaces/items';

import Deposit from './forms/depositForm';
import Withdraw from './forms/withdrawForm';
import { useLocation } from 'react-router-dom';

const ItemMovement = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const location = useLocation()

  const onSubmitDeposit : SubmitHandler<onDeposit> = (data) => {
    dispatch(showModal())

    dispatch(setModalContent({
      title : `Ingreso de stock para ${item?.name}`,
      message : `Se añadiran ${data.amount} ${item?.unit} al inventario.`,
      action : addStock({
        id : item?.id,
        amount : data.amount,
        dollarAtDate : data.dollarAtDate,
        totalPrice : data.totalPrice
      })
    }))
  }

  const onSubmitWithdraw : SubmitHandler<onWithdraw> = (data) => {
    dispatch(showModal())

    dispatch(setModalContent({
      title : `Retiro de stock para ${item?.name}`,
      message : `Se retiraran ${data.amount} ${item?.unit} del inventario.`,
      action : retireStock({
        id : item?.id,
        amount : data.amount
      })
    }))
  }

  const item = useAppSelector((state) => state.items.list.find((it) => it.id.toString() === id))

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Button onClick={() => navigate(-1)} variant='contained'>Volver</Button>
      </div>
      <h2 className={styles.title}>Ingresar stock para el producto {item?.name.toUpperCase()}</h2>
      <div className={styles.formContainer}>
        {location.pathname.includes('agregar')
          ?
            <Deposit onSubmit={onSubmitDeposit} item={item} />
          :
            <Withdraw onSubmit={onSubmitWithdraw} item={item} />
        }
      </div>
    </div>
  )
}

export default ItemMovement