import Category from "./categories";
import Item  from "./items";
import { StockMovements } from "./stockMovements";
import Unit from "./units";

export default interface TyTApiResponse {
  message : string,
  data : Item[] | Category[] | Unit[] | StockMovements[] | undefined,
  error : boolean
}

export interface KnownError {
  message : string,
  error : boolean
}