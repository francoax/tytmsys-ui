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
  name : string,
  unitId : number,
  categoryId : number,
  suppliers? : {
    supplierId : number
  }[]
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
