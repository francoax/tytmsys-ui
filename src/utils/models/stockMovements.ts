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

export interface StockMovements {
  id : number,
  action : string,
  realAmountUsed? : number,
  state : string,
  totalPrice : number,
  dollarAtDate : number,
  dateOfAction : Date,
  itemId : number,
  item : string,
  itemUnit : string
}