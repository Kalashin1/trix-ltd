import UserModel from '../../data/models/user.model'
import Transactions from '../../data/models/transaction.model';
import Exchanges from '../../data/models/exchange.model';
import { UserInputError } from 'apollo-server'

export const User = {
  async transactions(parent: any){
    return await Transactions.find({ customerId: parent._id }) 
  },
  async exchanges(parent: any){
    return await Exchanges.find({ customer: parent._id })
  }
}

export const UserQueries = {
  async users (_: any, { before, after, limit}) {
    // console.log(context.req.headers.usertoken);
    /**
     * * If before and after is not provided throw an error 
     */
     if(! before && (!after)){
      throw new UserInputError('before or after must be provided')
    }
    /**
     * * if no limit is provided use the default limit.
     */
    if(!limit){
      limit == 5  // * TODO change this limit to 10 later
    }
    /**
     * * if before and after is provided at the same time, throw an error.
     */
    if(before && after){
      throw new UserInputError('before and after should not be provided together, please prvide only one.')
    }
    const Users = await UserModel.find({});
    /**
     * * if only before is provided,
     */

    if(before && (! after )){
      // * get the current cursor the user passed in
      const currentCursor = Users.find(user => user.createdAt == before).createdAt;
      // * Map the edges 
      const Edges = Users.map(user => {
        return {
          cursor: user.createdAt,
          node: { User: user }
        }
      })

      console.log(Edges[0].node.User.createdAt)
      // * Generate page info
      const pageInfo = {
        endCursor: Users[
          Users.indexOf(Users.find(user => user.createdAt == before)) - limit + 1
        ].createdAt,

        hasNextPage: () => {

          const endCursor = Users.indexOf(Users.find(user => user.createdAt == before)) - limit + 1

          console.log(Users.slice(0, endCursor).length, limit)
          if(Users.slice(0, endCursor).length >= limit){
            return true
          } else {
            return false;
          }
        } // TODO this should be determined programiatically hasNext page
      }

      // get the end cursor, check if there are "limit" number of items in the array after the end cursor

      // * Generate a response
      const Response = {
        count: Edges.length,
        pageInfo,
        edges: Edges.slice(
          // * Get n number of edges after the cursor
          Edges.indexOf(
            Edges.find(e => e.node.User.createdAt == before )
          ) - limit,
          // * Stop at the cursor
          Edges.indexOf(
            Edges.find(e => e.node.User.createdAt == before )
          )
        )
      }
      return Response
    }

    if(!before && (after)){
      // * get the current cursor the user passed in
      const currentCursor = Users.find(user => user.createdAt == after).createdAt;
      // * Map the edges 
      const Edges = Users.map(user => {
        return {
          cursor: user.createdAt,
          node: { User: user }
        }
      })
      // * Generate page info
      const pageInfo = {
        endCursor: Users[
          Users.indexOf(Users.find(user => user.createdAt == after))
        ].createdAt,

       hasNextPage: () => {

          const endCursor = Users.indexOf(Users.find(user => user.createdAt == after)) + limit
          console.log(Users.slice(endCursor, Users.length).length, limit)
          if(Users.slice(endCursor, Users.length).length >= limit){
            return true
          } else {
            return false;
          }
        } // TODO this should be determined programiatically
      }

      // * Generate a response
      const Response = {
        count: Edges.length,
        pageInfo,
        edges: Edges.slice(
          // * Stop at the cursor
          Edges.indexOf(
            Edges.find(e => e.node.User.createdAt == after )
          ),
          // * Get n number of edges before the cursor
          Edges.indexOf(
            Edges.find(e => e.node.User.createdAt == after )
          ) + limit 
        )
      }
      return Response
    }
  },
  user (_:any, { id }, context: any){
    return UserModel.findById(id);
  }
}

export const UserMutations = {
  async createAccount(_:any, { profile }, context: any){
    try{
      // @ts-ignore
      const [ User, token ] = await UserModel.createAccount(profile);
      User.token = token
      return User
    } catch(e){
      return new UserInputError(e.message)
    }
  },
  async login(_:any, { loginInfo }, context: any){
    try{
      const [ user, token ] = await UserModel.login(loginInfo)
      user.token = token
      return user
    } catch(e){
      return new UserInputError(e.message)
    }
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
  async sendEmailVerificationMessage(parent:any, { email }){
    try {
      await UserModel.sendVerificationEmail(email)
      return { message: 'Verification code sent!, check your email'}
    } catch (error) {
      console.log(error)
      return new UserInputError(error.messsage)
    }
  },

  async verifyEmail(_:any, { email, code }){
    try {
      const User = await UserModel.findOne({ email })
      const emailVerified = await User.verifyEmail(code)
      if(emailVerified){
        return { message : "email Verified"}
      } else {
        return { message: "email is not verified"}
      }
    } catch (error) {
      return new UserInputError(error.message)
    }
  }
  
}