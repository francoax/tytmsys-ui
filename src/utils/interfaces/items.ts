export interface StockMovement {
  id : number,
  action : string,
  amount? : number,
  realAmountUsed? : number,
  state : string,
  totalPrice : number,
  dollarAtDate : number,
  dateOfAction : Date
}

export interface Item {
  id : number,
  name : string,
  suppliers : string[],
  unit : string,
  category : string,
  actualStock : number,
  stockMovements : StockMovement[]
}

export default interface ItemsResponse {
  message : string,
  data : Item[],
  error : boolean
}

export interface onDeposit {
  id? : number,
  amount : number,
  dollarAtDate : number,
  totalPrice : number
}

export interface onWithdraw {
  id? : number,
  amount : number
}
