export default interface Users {
  name: string,
  email: string,
  password: boolean,
  phone: string,
  recoveryToken: string,
  tokenExpiration: string,
  twoFactorAuth: boolean,
  createdAt: Date,
  updatedAt: Date,
  disabledAt: Date,
  workingHours: string,
}