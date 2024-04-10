export interface Request {
  data:object
  showLoading?:boolean
  contentType?:string
  method?:string|undefined
  url:string
  message?:string
}