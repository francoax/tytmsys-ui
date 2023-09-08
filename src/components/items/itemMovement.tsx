import React from 'react'

import { useAppDispatch, useAppSelector } from 'utils/redux/hooks';
import { setModalContent, showModal } from 'utils/redux/slices/modalSlice';
import { addStock, retireStock } from 'utils/redux/slices/itemSlice';
import { SubmitHandler } from 'react-hook-form';
import { onItemDeposit, onItemWithdraw } from 'utils/models/items';

import Deposit from './forms/depositForm';
import Withdraw from './forms/withdrawForm';

export type Movement = {
  action? : string,
  id? : number,
  show : boolean,
  displayHandler? : (value: React.SetStateAction<Movement>) => void
}


const ItemMovement = (props : Movement) => {
  const dispatch = useAppDispatch()

  const onSubmitDeposit : SubmitHandler<onItemDeposit> = (data) => {
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

  const onSubmitWithdraw : SubmitHandler<onItemWithdraw> = (data) => {
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

  const item = useAppSelector((state) => state.items.list.find((it) => it.id === props?.id))

  return (
    <>
        {props.action === 'add'
          ?
            <Deposit onSubmit={onSubmitDeposit} item={item} showFormHandler={props.displayHandler} />
          :
            <Withdraw onSubmit={onSubmitWithdraw} item={item} showFormHandler={props.displayHandler} />
        }
    </>
  )
}

export default ItemMovement