export default interface StockHistory {
  message : string,
  data : StockMovements[],
  error : boolean
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