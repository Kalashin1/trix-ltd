
import { Schema } from 'mongoose';
import { INotification } from '../../utils/interface';

const NotificationSchema: Schema<INotification> = new Schema({
  userId: {
    type: String,
    required: [true, 'Please provide the id of the owner']
  },
  body: {
    type: String,
    required: [true, 'please provide the body of the notification']
  },
  isRead: {
    type: Boolean,
    default: () => false
  },
  type: {
    type: String,
    required: [true, 'please provide the type of the notification']
  },
  date: {
    type: String,
    default: () => new Date().toString()
  }
})

export default NotificationSchema