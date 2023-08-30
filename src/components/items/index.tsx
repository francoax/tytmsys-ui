import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks';

import { getCategories } from 'utils/redux/thunks/categoriesThunks';
import { getItems } from 'utils/redux/thunks/itemsThunks';
import ListOfItems from './itemList';
import Item from 'utils/models/items';
import { setModalContent, showModal } from 'utils/redux/slices/modalSlice';

export default function BasicTable() {

  const itemsStore = useAppSelector((state) => state.items)
  const categoriesStore = useAppSelector((state) => state.categories)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getItems())
  }, [dispatch])

  const deleteItem = (item : Item) => {
  dispatch(showModal())

  dispatch(setModalContent({
    title : `Eliminar ${item.name}`,
    message : 'Estas seguro de que lo queres eliminar ?',
    action : ''
  }))
  }

  return (
    <>
      {!itemsStore.isLoading && !categoriesStore.isLoading && <ListOfItems deleteItem={deleteItem} /> }
    </>
  );
}