import React, { useEffect, useState } from 'react'
import Supplier from 'utils/models/supplier'
import SuppliersService from 'utils/services/suppliersService'
import ListOfSuppliers from './listSuppliers'

const Suppliers = () => {

  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    SuppliersService.getSuppliers().then(({ data }) => {
      setLoading(false)
      return setSuppliers(data.data as Supplier[])
    })
  }, [])

  return (
    <>
      {!loading && <ListOfSuppliers suppliers={suppliers} />}
    </>
  )
}

export default Suppliers