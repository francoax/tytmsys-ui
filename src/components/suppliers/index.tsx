import React, { useState } from 'react'
import ListOfSuppliers from './list'
import SupplierManagement from './supplierManagement'
import { Supplier } from 'utils/models/supplier'

const Suppliers = () => {

  const [formMng, setForm] = useState<{use : string, supToUpdate : Supplier | undefined, show : boolean}>()

  return (
    <>
      <ListOfSuppliers setForm={setForm} />
      {formMng?.show && <SupplierManagement {...formMng} setForm={setForm} />}
    </>
  )
}

export default Suppliers