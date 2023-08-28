import ItemsResponse from 'utils/interfaces/items'
import api from './index'

const getItems = async () => {
  try {
    const response : ItemsResponse = (await api.get('/items')).data

    
  } catch (error) {
  }
}