import { Schema } from 'mongoose'
import { UserInterface } from '../../utils/interface'
import { isEmail, isPassword } from '../../utils/validators'

const UserSchema: Schema<UserInterface> = new Schema<UserInterface>({
  name: {
    type: String,
    required: [true, 'Please provide your name.']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    validate: isEmail,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide your password.'],
    validate: isPassword,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide your number.']
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationCode: {
    type: String
  },
  displayImage: {
    type: String
  },
  createdAt: {
    type: String,
    default: () => String(new Date().getTime())
  }
})


export default UserSchema