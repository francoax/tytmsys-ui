import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from 'utils/redux/hooks';
import { setModalContent, showModal } from 'utils/redux/slices/modalSlice';
import { addStock, retireStock } from 'utils/redux/slices/itemSlice';
import { SubmitHandler } from 'react-hook-form';
import { onItemDeposit, onItemWithdraw } from 'utils/models/items';

import Deposit from './forms/depositForm';
import Withdraw from './forms/withdrawForm';
import Modal from 'components/common/modal';

export type Movement = {
  action? : string,
  id? : number,
  show : boolean,
  displayHandler? : (value: React.SetStateAction<Movement>) => void
}


const ItemMovement = (props : Movement) => {
  const dispatch = useAppDispatch()
  const modal = useAppSelector((state) => state.modal)
  const [action, setAction] = useState<onItemDeposit | onItemWithdraw>()

  const item = useAppSelector((state) => state.items.list.find((it) => it.id === props?.id))

  const onSubmitDeposit : SubmitHandler<onItemDeposit> = (data) => {
    dispatch(showModal())

    dispatch(setModalContent({
      title : `Ingreso de stock para ${item?.name}`,
      message : `Se añadiran ${data.amount} ${item?.unit} al inventario.`,
    }))

    setAction({
        id : item?.id,
        amount : data.amount,
        dollarAtDate : data.dollarAtDate,
        totalPrice : data.totalPrice
    })
  }

  const onSubmitWithdraw : SubmitHandler<onItemWithdraw> = (data) => {
    dispatch(showModal())

    dispatch(setModalContent({
      title : `Retiro de stock para ${item?.name}`,
      message : `Se retiraran ${data.amount} ${item?.unit} del inventario.`,
    }))

    setAction({
        id : item?.id,
        amount : data.amount
    })
  }

  return (
    <>
        {props.action === 'add'
          ?
            <>
              <Deposit onSubmit={onSubmitDeposit} item={item} showFormHandler={props.displayHandler} />
              {modal.isShown && <Modal action={addStock(action as onItemDeposit)} />}
            </>
          :
            <>
              <Withdraw onSubmit={onSubmitWithdraw} item={item} showFormHandler={props.displayHandler} />
              {modal.isShown && <Modal action={retireStock(action as onItemWithdraw)} />}
            </>
        }
    </>
  )
}

export default ItemMovement