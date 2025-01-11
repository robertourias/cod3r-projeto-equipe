
export function isValidEmail(email: string): boolean {
  const REGEX = /^[a-z0-9._]+@[a-z0-9]{3,}\.[a-z0-9-]{2,}(?:\.[a-z]{2,})*$/
  return REGEX.test(email)
}


/**
 * At least one lowercase letter ([a-z])
 * At least one uppercase letter ([A-Z])
 * At least one digit ([0-9])
 * At least one special character ([@#$%^&*])
 * A minimum length of 8 characters (.{8,})
 */
export function isValidPassword(password: string): boolean {
  const REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/
  return REGEX.test(password)
}


export function isValidName(name: string, min: number = 3, max: number = 100): boolean {
  if (name == "" || name.length < 3 || name.length > 100) {
    return false
  }
  return true
}