import bcryptjs from 'bcryptjs'

export const encryptedPassword = async(password) => {
  const salt = await bcryptjs.genSalt(12);
  return await bcryptjs.hash(password, salt)
}

export const verifyPassword = async(bodyPassword, userPassword) => {
  return await bcryptjs.compare(bodyPassword, userPassword)
}