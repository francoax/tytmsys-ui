import ItemManagement from 'components/items/forms/itemManagement'
import ItemDetail from 'components/items/itemDetail'
import ItemMovement from 'components/items/itemMovement'
import List from 'components/items'
import Layout from 'components/layout'
import StockHistory from 'components/stock'
import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router = () => {
  return (
    <>
      <BrowserRouter>
      <Suspense fallback={<div><h1>Loading...</h1></div>}>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<List />} />
            <Route path=':id' element={<ItemDetail />} />
            <Route path='/nuevoProducto' element={<ItemManagement />} />
            <Route path=':id/agregarStock' element={<ItemMovement />} />
            <Route path=':id/retirarStock' element={<ItemMovement />} />
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