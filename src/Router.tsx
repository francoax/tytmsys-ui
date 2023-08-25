import ItemDetail from 'components/items/itemDetail'
import Deposit from 'components/items/itemDeposit'
import Withdraw from 'components/items/itemWithdraw'
import List from 'components/items/productsList'
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
            <Route path=':id/agregarStock' element={<Deposit />} />
            <Route path=':id/retirarStock' element={<Withdraw />} />
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