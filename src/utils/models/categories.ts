import Item from "./items"

export default interface Category {
  id : number,
  name : string,
  items : Item[]
}

export interface CategoryAgent {
  name : string
}