import { ItemAgent, onItemDeposit, onItemWithdraw } from 'utils/models/items'
import api from './index'
import TyTApiResponse from 'utils/models/commons'

const ItemsService = {
  getItems : function(){
    return api.get<TyTApiResponse>('/items')
  },
  getById : (id : number) => {
    return api.get<TyTApiResponse>(`/items/${id}`)
  },
  createItem : function(item : ItemAgent) {
    return api.post<TyTApiResponse>('/items', item)
  },
  deleteItem : (id : number) => {
    return api.delete<TyTApiResponse>(`/items/${id}`)
  },
  depositStock : function(deposit : onItemDeposit) {
    return api.post<TyTApiResponse>(`/items/movements/deposit/${deposit.id}`, {
      amount : deposit.amount,
      dollarAtDate : deposit.dollarAtDate,
      totalPrice : deposit.totalPrice
    })
  },
  retireStock : function(withdraw : onItemWithdraw) {
    return api.post<TyTApiResponse>(`/items/movements/withdraw/${withdraw.id}`, {
      amount : withdraw.amount
    })
  },
  confirmWithdraw : (id : number, realAmountUsed : number) => {
    return api.put<TyTApiResponse>(`/items/movements/${id}`, {
      realAmountUsed
    })
  }
}

export default ItemsService