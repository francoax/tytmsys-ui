import TyTApiResponse from "utils/models/commons"
import api from "."
import { SupplierAgent } from "utils/models/supplier"

const SuppliersService = {
  getSuppliers : async function() {
    return await api.get<TyTApiResponse>('/suppliers')
  },
  postSupplier : async function(supplier : SupplierAgent) {
    return await api.post<TyTApiResponse>('/suppliers', supplier)
  },
  putSupplier : async function(supplier : SupplierAgent) {
    return await api.put<TyTApiResponse>(`/suppliers/${supplier.id}`, supplier)
  },
  deleteSupplier : async function(id : number) {
    return await api.delete<TyTApiResponse>(`/suppliers/${id}`)
  }
}

export default SuppliersService