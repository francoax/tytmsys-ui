import ItemManagement from 'components/items/forms/itemManagement'
import ItemDetail from 'components/items/itemDetail'
import ListOfItems from 'components/items'
import Layout from 'components/layout'
import StockHistory from 'components/stockHistory'
import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Suppliers from 'components/resources/suppliers'

const Router = () => {
  return (
    <>
      <BrowserRouter>
      <Suspense fallback={<div><h1>Loading...</h1></div>}>
        <Routes>
          <Route path='/' element={<Layout />} >

            <Route index element={<ListOfItems />} />
            <Route path=':id' element={<ItemDetail />} />
            <Route path='/nuevoProducto' element={<ItemManagement />} />

            <Route path='/proveedores' element={<Suppliers />} />
            {/* <Route path='/proveedores/agregar' element={<Suppliers />} />
            <Route path='/proveedores/:id/editar' element={<Suppliers />} /> */}

            <Route path='historial' element={<StockHistory />} />
            <Route path='*' element={<h1>404</h1>} />
          </Route>
        </Routes>
      </Suspense>
      </BrowserRouter>
    </>
  )
}

export default Router