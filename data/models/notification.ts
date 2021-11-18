import { model } from 'mongoose';
import { INotification, NotificationModel, UserInterface } from '../../utils/interface';
import NotificationSchema from "../Schemas/notfication";
import UserModel from './user.model';

NotificationSchema.methods.findOwner = async function() {
  let owner: UserInterface
  owner = await UserModel.findById(this.userId)
  return owner
}

NotificationSchema.methods.markAsRead = async function () {
  await this.updateOne({ isRead: true })
}

NotificationSchema.statics.findUserNotifications = async function (userId) {
  const Notifications = await this.find({ userId })
  // .where('ownerId').equals(ownerId)
  // console.log(Notifications)
  return Notifications
}

NotificationSchema.statics.getUnReadNotifications = async function (userId) {
  const Notifications = await this.find({userId}).where('isRead').equals(false)
  return Notifications
}

NotificationSchema.statics.markMutlipleAsRead = async function (userIds: string[]){
  userIds.forEach(async (id) => {
    const notification = await this.findById(id);
    await notification.markAsRead()
  })
}
const Notifications = model<INotification, NotificationModel>('notification', NotificationSchema)

export default Notifications