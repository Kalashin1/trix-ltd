import * as jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

const maxAge = 3 * 24 * 60 *60

const createToken = (id: String|ObjectId, secrete: string) => {
  return jwt.sign({id}, secrete, {
    expiresIn: 3 * 24* 60 * 60
  })
}


export const verifyToken = (token, secrete) => {
  return jwt.verify(token, secrete, (error, _decodedToken: any) => {
    if (error) {
      console.log(error)
      return false
    } else {
      return _decodedToken.id
    }
  })
}
export { maxAge, createToken }