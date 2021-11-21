import UserModel from '../../data/models/user.model'
import Notifications from '../../data/models/notification'
import { UserInputError } from 'apollo-server'
import { AnyAaaaRecord } from 'dns'

export const User = {
  
}

export const UserQueries = {
  async users (_: any) {
    // console.log(context.req.headers.usertoken);
    return await UserModel.find({});
  },
  user (_:any, { id }, context: any){
    return UserModel.findById(id);
  }
}

export const UserMutations = {
  async createAccount(_:any, { profile }, context: any){
    // @ts-ignore
    const [ User, token ] = await UserModel.createAccount(profile);
    User.token = token
    return User
  },
  async login(_:any, { loginInfo }, context: any){
    const [ user, token ] = await UserModel.login(loginInfo)
    user.token = token
    return user
  },
  async updatePhoneNumber(_: any, { phoneNumber, id }, context){
    try{
      const user = await UserModel.findById(id);
      const res = await user.updatePhoneNumber(phoneNumber)
      return { message: res }
    }
    catch (e) {
      console.log(e)
    }
    
  },
  // async updateDisplayImage(_: any, { imageUrl, id }, context){
  //   try{
  //     const user = await UserModel.findById(id);
  //     const res = await user.updateDisplayImage(imageUrl)
  //     return res
  //   }
  //   catch (e) {
  //     console.log(e)
  //   }
  // },
  // async updateGender(_: any, { gender, id }, context){
  //   return await updateGender(id, gender)
  // },
  // async updateSocialMediaInfo(_: any, { socialMediaInfo, id }, context){
  //   return await updateSocialMediaInfo(id, socialMediaInfo)
  // },
  // async deleteAccount(_:any, { id }, context){
  //   const user = getUser(id)
  //   if(user) {
  //     await deleteUser(id)
  //     return user
  //   }
  // },
  // async followUser(_:any, { userId, followerId }){
  //   const user = await UserModel.followUser(userId, followerId)
  //   console.log(user)
  //   return user
  // },
  // async unFollowUser(_:any, { userId, followerId }){
  //   return await UserModel.unFollowUser(userId, followerId)
  // }
}