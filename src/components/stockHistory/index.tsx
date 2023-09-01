import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { getStockMovements } from 'utils/redux/slices/stockHistorySlice';

const StockHistory = () => {

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.stocks.isLoading);
  const error = useAppSelector((state) => state.stocks.error);
  const list = useAppSelector((state) => state.stocks.list);

  useEffect(() => {
    if(list.length === 0) {
      dispatch(getStockMovements())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])


  if(isLoading) {
    return <h1>Loading...</h1>
  }

  if(error) {
    return <h1>{error}</h1>
  }

  return (
    <>
      <div>
        {list?.map((stock, index) => (
          <p key={index}>
            {stock.item}
          </p>
        ))}
      </div>
    </>
  )
}

export default StockHistory