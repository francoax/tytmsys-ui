export default interface TyTApiResponse {
  message : string,
  data? : any
  error : boolean
}

export interface KnownError {
  message : string,
  error : boolean
}