import { StockMovement } from "./stockMovements"

export default interface Item {
  id : number,
  name : string,
  suppliers : string[],
  unit : string,
  category : string,
  actualStock : number,
  stockMovements : StockMovement[]
}

export interface ItemAgent {
  id? : number,
  name : string,
  unitId? : number,
  categoryId? : number,
  suppliers? : (number | undefined)[] | { supplierId : number }[] | undefined
}

export interface onItemDeposit {
  id? : number,
  amount : number,
  dollarAtDate : number,
  totalPrice : number
}

export interface onItemWithdraw {
  id? : number,
  amount : number
}
