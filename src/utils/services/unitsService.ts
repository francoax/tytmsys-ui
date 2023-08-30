import TyTApiResponse from 'utils/models/commons'
import api from './index'

const UnitsService = {
  getUnits : function() {
    return api.get<TyTApiResponse>('/units')
  }
}

export default UnitsService