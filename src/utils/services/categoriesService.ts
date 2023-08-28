import api from './index'
import Categories from 'utils/interfaces/categories'


export const getCategories = async () => {

  const response = await api.get('/categories')
  const data = response.data as Categories

  return data
}