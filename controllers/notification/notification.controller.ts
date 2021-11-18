import Notifications from "../../data/models/notification";
import UserModel from "../../data/models/user.model";
import { UserInputError } from "apollo-server";

export const NotificationQueries = {
  async notifications(_:any, { before, after, limit }){
    const notifications = await Notifications.find({})
    // console.log(notifications)
    if(!after && !before){
      after = notifications[0]._id.toString()
    }

    let pageInfo;
    let Response;

    
    const Edges = notifications.map((notification) => {
      // console.log(notification)
      return ({
        cursor: notification._id.toString(),
        node: { Notification: notification }
      })
    })


    if(before && after){
      throw new UserInputError("cannot use before and after inside a single query")
    }

    if(before){
      pageInfo = {
        endCursor: notifications[
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == before )
          ) - limit + 1
        ]._id.toString(),
        hasNextPage: Edges.length % limit === 0 
      }

      Response = {
        pageInfo,
        count: Edges.length,
        edges: Edges.slice(
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == before )
          ),
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == before )
          ) + limit
        )
      }

    } else {
        pageInfo = {
        endCursor: notifications[
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == after )
          ) + limit - 1
        ]._id.toString(),
        hasNextPage: Edges.length % limit === 0
      }

      Response = {
        pageInfo,
        count: Edges.length,
        edges: Edges.slice(
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == after )
          ),
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == after )
          ) + limit
        )
        }
    }
    
    console.log(Edges)
    
    // console.log(Response)
    return Response
  },
  async notification(_:any, { id }){
    return await Notifications.findById(id)
  },
  async usersNotifications(_:any, { userId, limit, before, after }){
    const notifications = await Notifications.findUserNotifications(userId)
    // console.log(notifications)
    if(!after && !before){
      after = notifications[0]._id.toString()
    }

    let pageInfo;
    let Response;

    
    const Edges = notifications.map((notification) => {
      // console.log(notification)
      return ({
        cursor: notification._id.toString(),
        node: { Notification: notification }
      })
    })


    if(before && after){
      throw new UserInputError("cannot use before and after inside a single query")
    }

    if(before){
      pageInfo = {
        endCursor: notifications[
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == before )
          ) - limit + 1
        ]._id.toString(),
        hasNextPage: Edges.length % limit === 0 
      }

      Response = {
        pageInfo,
        count: Edges.length,
        edges: Edges.slice(
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == before )
          ),
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == before )
          ) + limit
        )
      }

    } else {
        pageInfo = {
        endCursor: notifications[
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == after )
          ) + limit - 1
        ]._id.toString(),
        hasNextPage: Edges.length % limit === 0
      }

      Response = {
        pageInfo,
        count: Edges.length,
        edges: Edges.slice(
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == after )
          ),
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == after )
          ) + limit
        )
        }
    }
    
    console.log(Edges)
    
    // console.log(Response)
    return Response
  },
  async usersUnReadNotifications(_:any, { userId, before, after, limit }){
    const notifications = await Notifications.getUnReadNotifications(userId)
    // console.log(notifications)
    if(!after && !before){
      after = notifications[0]._id.toString()
    }

    let pageInfo;
    let Response;

    
    const Edges = notifications.map((notification) => {
      // console.log(notification)
      return ({
        cursor: notification._id.toString(),
        node: { Notification: notification }
      })
    })


    if(before && after){
      throw new UserInputError("cannot use before and after inside a single query")
    }

    if(before){
      pageInfo = {
        endCursor: notifications[
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == before )
          ) - limit + 1
        ]._id.toString(),
        hasNextPage: Edges.length % limit === 0 
      }

      Response = {
        pageInfo,
        count: Edges.length,
        edges: Edges.slice(
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == before )
          ),
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == before )
          ) + limit
        )
      }

    } else {
        pageInfo = {
        endCursor: notifications[
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == after )
          ) + limit - 1
        ]._id.toString(),
        hasNextPage: Edges.length % limit === 0
      }

      Response = {
        pageInfo,
        count: Edges.length,
        edges: Edges.slice(
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == after )
          ),
          Edges.indexOf(
            Edges.find(e => e.node.Notification._id.toString() == after )
          ) + limit
        )
        }
    }
    
    console.log(Edges)
    
    // console.log(Response)
    return Response
  }
}

export const NotificationMutations = {
  async markNotificationAsRead(_: any, { id }){
    let Notification = await Notifications.findById(id)
    await Notification.markAsRead()
    return Notification
  },
  async markMultipleNotificationsAsRead(_: any, { ids }){
    await Notifications.markMutlipleAsRead(ids)
    return "Notifications marked"
  }
}
export const Notification = {
  async user(_:any){
    const User = await UserModel.findById(_.userId);
    return User
  }
}