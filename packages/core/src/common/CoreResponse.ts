export interface CoreResponse {
  success?: boolean,
  message?: string,
  status?: number,
  data?: any,
  errors?: any[],
}

// export interface CoreResponse {
//   token?: string,
//   user?: UserProps
// }