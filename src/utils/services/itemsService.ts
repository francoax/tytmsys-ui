import { ItemAgent, onItemDeposit, onItemWithdraw } from 'utils/models/items'
import api from './index'
import TyTApiResponse from 'utils/models/commons'

const ItemsService = {
  getItems : function(){
    return api.get<TyTApiResponse>('/items')
  },
  createItem : function(item : ItemAgent) {
    return api.post('/items', item)
  },
  depositStock : function(deposit : onItemDeposit) {
    return api.post(`/items/movements/deposit/${deposit.id}`, {
      amount : deposit.amount,
      dollarAtDate : deposit.dollarAtDate,
      totalPrice : deposit.totalPrice
    })
  },
  retireStock : function(withdraw : onItemWithdraw) {
    return api.post(`/items/movements/withdraw/${withdraw.id}`, {
      amount : withdraw.amount
    })
  }
}

export default ItemsService