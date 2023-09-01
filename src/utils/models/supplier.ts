import Item from "./items"

export default interface Supplier {
  id : number,
  name : string,
  phone : string,
  email : string,
  direction : {
    street : string,
    streetNumber : string,
    city : string
  },
  items : Item[],
}

export interface SupplierAgent {
  id? : number,
  name : string,
  phone? : string,
  email? : string,
  direction? : {
    street? : string,
    streetNumber? : string,
    city? : string
  },
}