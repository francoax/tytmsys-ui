import api from './index'
import TyTApiResponse from 'utils/models/commons'

const CategoriesService = {
  getCategories : function() {
    return api.get<TyTApiResponse>('/categories')
  },
  addCategory : function() {
    return api.post('/categories', {})
  }
}

export default CategoriesService