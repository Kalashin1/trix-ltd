import { model } from 'mongoose'
import { CommentModelInterface, CommentInterface, CreateComment, CreateChildComment } from '../../utils/interface'
import CommentSchema from '../schemas/comments.schema'
import Notifications from './notification'
import Articles from './article.model'
import UserModel from './user.model'

CommentSchema.statics.createComment = async function(comment: CommentInterface){
  const article = await Articles.findById(comment.articleId)
  if(article){
    const user = await UserModel.findById(comment.userId)
    await Notifications.create({
      userId: article.author,
      body: `${user.name} commented on your article.`,
      type: "Article commented on."
    })
    return await this.create(comment)
  }
  throw Error('No article exists with that id')
}

CommentSchema.statics.editComment = async function(comment: CommentInterface){
  const Comment = await this.findById(comment._id)
  if(Comment){
    await this.updateOne({ _id: comment._id }, comment)
    return Comment
  }
  throw Error('No Comment exists with that id')
}

CommentSchema.statics.deleteComment = async function(comment: CommentInterface){
  const Comment = await this.findById(comment._id)
  if(Comment){
    await this.deleteOne({ _id: comment._id })
    return Comment
  }
  throw Error('No Comment exists with that id')
}

CommentSchema.methods.likeComment = async function(userId: string, optn: string){
  const user = await UserModel.findById(userId);
  const article = await Articles.findById(this.articleId)
  if (user) {
    optn === 'add' ? await this.updateOne({ likes: this.likes + 1 }) : await this.updateOne({ likes: this.likes - 1 })
    await Notifications.create({
      userId: article.author,
      body: `${user.name} likes your comment.`,
      type: "Comment liked."
    })
    return this
  }
  throw Error('No user exists with that id')
}

CommentSchema.methods.comment = async function(comment: CreateChildComment){
  comment.parentCommentId = this._id.toString();
  const article = await Articles.findById(comment.articleId)
  const commentor = await UserModel.findById(comment.userId)
  const Comment = await model('comment').create(comment)
  await Notifications.create({
    userId: article.author,
    body: `${commentor.name} replied to your comment.`,
    type: "Comment replied."
  })
 return Comment
}

const Comments = model<CommentInterface, CommentModelInterface>('comment', CommentSchema)

export default Comments