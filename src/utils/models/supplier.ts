export interface Supplier {
  id : number,
  name : string,
  address : string,
  contact : string,
  items : {
    id : number,
    name : string
  }[]
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