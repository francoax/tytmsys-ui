import { ItemAgent, onItemDeposit, onItemWithdraw } from 'utils/models/items'
import api from './index'
import TyTApiResponse from 'utils/models/commons'

const ItemsService = {
  getItems : () => {
    return api.get<TyTApiResponse>('/items')
  },
  getById : (id : number) => {
    return api.get<TyTApiResponse>(`/items/${id}`)
  },
  createItem : (item : ItemAgent) => {
    return api.post<TyTApiResponse>('/items', item)
  },
  updateItem : (item : ItemAgent, id? : number) => {
    return api.put<TyTApiResponse>(`/items/${id}`, item)
  },
  deleteItem : (id : number) => {
    return api.delete<TyTApiResponse>(`/items/${id}`)
  },
  depositStock : (deposit : onItemDeposit) => {
    return api.post<TyTApiResponse>(`/items/movements/deposit/${deposit.id}`, {
      amount : deposit.amount,
      dollarAtDate : deposit.dollarAtDate,
      totalPrice : deposit.totalPrice
    })
  },
  retireStock : (withdraw : onItemWithdraw) => {
    return api.post<TyTApiResponse>(`/items/movements/withdraw/${withdraw.id}`, {
      amount : withdraw.amount
    })
  },
  confirmWithdraw : (id : number, realAmountUsed : number) => {
    return api.put<TyTApiResponse>(`/items/movements/${id}`, {
      realAmountUsed
    })
  },
  getAllMovements : () => {
    return api.get<TyTApiResponse>('/items/movements')
  }
}

export default ItemsService