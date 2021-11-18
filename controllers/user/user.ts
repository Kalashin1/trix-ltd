import { getUsers, createAccount, login, getUser, updatePhoneNumber, updateDOB, updateDisplayImage, updateSocialMediaInfo, updateGender, deleteUser } from './user.controller'
import UserModel from '../../data/models/user.model'
import Articles from '../../data/models/article.model'
import Notifications from '../../data/models/notification'
import { UserInputError } from 'apollo-server'

export const User = {
  async articles (parent: any){
    return await Articles.getUserArticles(parent._id)
  },
  async savedArticles(parent:any){
    const articles = parent.savedArticles.map(async (article) => {
      return Articles.findById(article)
    })
    return articles
  },
  async followers(parent:any){
    return parent.followers.map(f => UserModel.findById(f))
  },
  async following(parent:any){
    return parent.following.map(f => UserModel.findById(f))
  },
  async notifications(parent:any){
    return Notifications.findUserNotifications(parent._id)
  }
}

export const UserQueries = {
  async users (_: any, { after, limit }: any, context: any) {
    // console.log(context.req.headers.usertoken);
    const Users = await getUsers()

    if(!after){
      after = Users[0]._id.toString()
    }
    // console.log(Users)
    
    const Edges = Users.map((user) => {
      console.log(user)
      return ({
        cursor: user._id.toString(),
        node: { User: user }
      })
    })
    
    const pageInfo = {
      endCursor: Users[
        Edges.indexOf(
          Edges.find(e => e.node.User._id.toString() == after )
        ) + limit - 1
      ]._id.toString(),
      hasNextPage: false
    }
    // console.log(Edges)
    const Response = {
      pageInfo,
      count: Edges.length,
      edges: Edges.slice(
        Edges.indexOf(
          Edges.find(e => e.node.User._id.toString() == after )
        ),
        Edges.indexOf(
          Edges.find(e => e.node.User._id.toString() == after )
        ) + limit
      )
      }
      console.log(Response)
      return Response
  },
  user (_:any, { id }, context: any){
    return getUser(id)
  }
}

export const UserMutations = {
  async createAccount(_:any, { profile }, context: any){
    const [ User, token ] = await createAccount(profile);
    User.token = token
    return User
  },
  async login(_:any, { loginInfo }, context: any){
    const [ user, token ] = await login(loginInfo)
    user.token = token
    return user
  },
  async updatePhoneNumber(_: any, { phoneNumber, id }, context){
    return await updatePhoneNumber(id, phoneNumber)
  },
  async updateDOB(_: any, { dob, id }, context){
    return await updateDOB(id, dob)
  },
  async updateDisplayImage(_: any, { imageUrl, id }, context){
    return await updateDisplayImage(id, imageUrl)
  },
  async updateGender(_: any, { gender, id }, context){
    return await updateGender(id, gender)
  },
  async updateSocialMediaInfo(_: any, { socialMediaInfo, id }, context){
    return await updateSocialMediaInfo(id, socialMediaInfo)
  },
  async deleteAccount(_:any, { id }, context){
    const user = getUser(id)
    if(user) {
      await deleteUser(id)
      return user
    }
  },
  async followUser(_:any, { userId, followerId }){
    const user = await UserModel.followUser(userId, followerId)
    console.log(user)
    return user
  },
  async unFollowUser(_:any, { userId, followerId }){
    return await UserModel.unFollowUser(userId, followerId)
  }
}