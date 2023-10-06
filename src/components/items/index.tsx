import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks';

import { getCategories } from 'utils/redux/thunks/categoriesThunks';
import { getItems } from 'utils/redux/thunks/itemsThunks';
import ListOfItems from './itemList';

export default function BasicTable() {

  const itemsStore = useAppSelector((state) => state.items)
  const categoriesStore = useAppSelector((state) => state.categories)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getItems())
  }, [dispatch])

  return (
    <>
      {!itemsStore.isLoading && !categoriesStore.isLoading && <ListOfItems /> }
    </>
  );
}