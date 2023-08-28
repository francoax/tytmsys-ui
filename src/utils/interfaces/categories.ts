import { Item } from "./items"

export default interface Categories {
  message : string,
  data : {
    name : string,
    items : Item[]
  }[],
  error : boolean
}