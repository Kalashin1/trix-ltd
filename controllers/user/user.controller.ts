import UserModel from '../../data/models/user.model';
import { CreateAccountProfile, Gender, loginInfo, socialMediaInfo } from '../../utils/interface'

// * Create an account for the user
/**
 * 
 * @function createAccount, creates a new account for a user 
 * @returns the newly created object
 */
export const createAccount = async (profile: CreateAccountProfile) => {
  try {
    const user = await UserModel.createAccount(profile)
    return user
  } catch (error) {
    console.log(error)
  }
}

// * Log a user in
export const login = async (info: loginInfo) => {
  try {
    const user = await UserModel.login(info);
    return user
  } catch (error) {
    console.log(error)
  }
}
// * Get all users on the platform
export const getUsers = async () => {
  try {
    const Users = await UserModel.find({});
    // console.log(Users)
    return Users
  } catch (error) {
    console.log(error)
  }
}
// * Get a particular user
export const getUser = async(id) => {
  try {
    const User = await UserModel.findById(id);
    return User
  } catch (error) {
    console.log(error)
  }
}
// * Update gender
export const updateGender = async (id, gender: Gender) => {
  try {
    const User = await UserModel.findById(id);
    await User.updateGender(gender)
    return User
  } catch (error) {
    console.log(error)
  }
}
// * Update DOB
export const updateDOB = async (id, dob: string) => {
  try {
    const User = await UserModel.findById(id);
    await User.updateDOB(dob)
    return User
  } catch (error) {
    console.log(error)
  }
}
// * Update Display image
export const updateDisplayImage = async (id, imageUrl: string) => {
  try {
    const User = await UserModel.findById(id);
    await User.updateDisplayImage(imageUrl)
    return User
  } catch (error) {
    console.log(error)
  }
}
// * Update phoneNumber
export const updatePhoneNumber = async (id, phoneNumber: string) => {
  try {
    const User = await UserModel.findById(id);
    await User.updatePhoneNumber(phoneNumber)
    return User
  } catch (error) {
    console.log(error)
  }
}
// * Update socialMediaLinks
export const updateSocialMediaInfo = async (id, _socialMediaInfo: socialMediaInfo) => {
  try {
    const User = await UserModel.findById(id);
    await User.updateSocialMediaInfo(_socialMediaInfo)
    return User
  } catch (error) {
    console.log(error)
  }
}
// * delete a user 
export const deleteUser = async(_id) => {
  try {
    await UserModel.remove({ _id })
    return "User Deleted!"
  } catch (error) {
    console.log(error)
  }
}