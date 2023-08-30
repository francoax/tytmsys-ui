import Item  from "./items";

export default interface Unit {
  id : number
  description : string,
  items : Item[],
}

export interface UnitAgent {
  description : string
}