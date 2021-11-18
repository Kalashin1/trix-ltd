import { model }  from "mongoose";
import { ArticleInterface, ArticleModelInterface, CreateArticle } from "../../utils/interface";
import ArticleSchema from '../schemas/article.schema'
import Notifications from './notification'
import UserModel from './user.model'

ArticleSchema.statics.createArticle = async function (article: CreateArticle) {
  const author = await UserModel.findById(article.author)
  if (author){
    const Article = await this.create({...article})
    await Notifications.create({
      userId: Article.author,
      body: `A new Article with title ${Article.title} has been created by ${author.name}`,
      type: "Article created."
    })
    return Article
  } else {
    throw Error('No user with Id!');
  }
}

ArticleSchema.statics.updateArticle = async function (article: CreateArticle) {
  const Article = await this.findById(article._id);
  if (Article){
    const time = new Date().toString()
    await Article.updateOne({ ...article, updatedAt: time })
    return Article
  }
  throw Error('That article does not exist')
}

ArticleSchema.statics.getUserArticles = async function (author:string) {
  return this.find({ author })
}

ArticleSchema.statics.deleteArticle = async function (article: CreateArticle) {
  const Article = await this.findById(article._id);
  if (Article) {
    await Article.deleteOne({ _id: article._id })
    return Article
  }
  throw Error('That article does not exist')
}

ArticleSchema.methods.likeArticle = async function (userId: string, optn: string){
  const user = await UserModel.findById(userId);
  if (user) {
    optn === 'add' ? await this.updateOne({ likes: this.likes + 1 }) : await this.updateOne({ likes: this.likes - 1 })
    await Notifications.create({
      userId: user._id,
      body: `You have a new like on your article, total likes, ${this.likes}`,
      type: "New Like on article."
    })
    return this
  }
  throw Error('No user exists with that id')
}

ArticleSchema.methods.saveArticle = async function (userId: string, optn: string){
  const user = await UserModel.findById(userId);
  if (user) {
    if (optn === 'add'){
      await this.updateOne({ saves: this.saves + 1 })
      await user.updateOne({ savedArticles: [...user.savedArticles, this._id.toString()]})
    } else {
      await this.updateOne({ saves: this.saves - 1 })
      await user.updateOne({ savedArticles: user.savedArticles.filter(a => a !== this._id.toString())})
    }
    return this
  }
  throw Error('No user exists with that id')
}

ArticleSchema.methods.readArticle = async function (userId: string, optn: string){
  const user = await UserModel.findById(userId);
  if (user) {
    optn === 'add'? await this.updateOne({ views: this.views + 1 }) : await this.updateOne({ views: this.views - 1 })
    return this
  }
  throw Error('No user exists with that id')
}

ArticleSchema.pre('save', async function(){
  const words = this.body.split(' ');
  const readingTimeInSeconds = ( words.length / 200) * .60;
  const readingTimeInMins = Math.floor(readingTimeInSeconds * 60)
  this.readingTime = `${readingTimeInMins} mins`  
})

ArticleSchema.post('save', async function(){
  const user = await UserModel.findById(this.author);
  let articles = [...user.articles, this._id];
  //@ts-ignore
  await user.updateOne({ articles })
})

ArticleSchema.pre('updateOne', async function (){
  this.updatedAt = new Date().toString()
})

const Articles = model<ArticleInterface, ArticleModelInterface>('article', ArticleSchema);
export default Articles