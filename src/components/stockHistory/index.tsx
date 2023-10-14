import React, { useEffect } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { format } from 'date-fns'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { getMovements } from 'utils/redux/thunks/stockThunks'

import stylesG from 'index.module.css'
import styles from './stock.module.css'

const StockHistory = () => {

  const dispatch = useAppDispatch()
  const stockStore = useAppSelector((state) => state.stock)

  useEffect(() => {
    if(stockStore.list.length < 1) {
      dispatch(getMovements())
    }
  }, [])

  const formatDate = (date : string) : string => {
    date = date + 'Z'
    const dateInstance = new Date(date)
    return format(dateInstance, 'dd MMM yyyy, HH:mm a')
  }

  return (
    <>
      <div className={stylesG.three}>
        <h1>Historial de movimientos de stock</h1>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Accion</TableCell>
              <TableCell align="right">Producto</TableCell>
              <TableCell align="right">Cantidad involucrada</TableCell>
              <TableCell align="right">Cantidad real usada</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Dolar a la fecha</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockStore.list.map((sm) => (
              <TableRow
                key={sm.id}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                sx={sm.action === 'ingreso' ?
                    {backgroundColor : 'rgba(51, 170, 51, .4)', borderRadius : '5px'}
                    :
                    sm.state !== 'confirmado' ?
                      {backgroundColor : 'rgba(102, 172, 197, 0.7)', borderRadius : '5px'}
                        :
                      {backgroundColor : 'rgba(221, 86, 28, 0.4)', borderRadius : '5px'}
                  }
              >
                <TableCell component="th" scope="row">
                  {sm.id}
                </TableCell>
                <TableCell align="right">{sm.action}</TableCell>
                <TableCell align="right">{sm.item}</TableCell>
                <TableCell align="right">{sm.amount} {sm.itemUnit}</TableCell>
                <TableCell align="right">{sm.action === 'ingreso' ? '-' : `${sm.realAmountUsed} ${sm.itemUnit}`}</TableCell>
                <TableCell align="right">{sm.action === 'ingreso' ? `$${sm.totalPrice}` : '-'}</TableCell>
                <TableCell align="right">{sm.action === 'ingreso' ? `U$S${sm.dollarAtDate}` : '-'}</TableCell>
                <TableCell align="right">{sm.state?.toUpperCase()}</TableCell>
                <TableCell align="right">{formatDate(sm.dateOfAction.toString())}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default StockHistory