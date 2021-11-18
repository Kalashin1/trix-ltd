import Articles from "../../data/models/article.model";
import Comments from "../../data/models/comment.model";
import { UserInputError } from "apollo-server";

const ArticleMutations = {

  async createArticle(_:any, { article }, context){
    return await Articles.createArticle(article)
  },

  async updateArticle(_:any, { article }, context){
    return await Articles.updateArticle(article)
  },

  async deleteArticle(_:any, { article }, context){
    return await Articles.deleteArticle(article)
  },

  async toggleLikes(_: any, { articleId, userId, optn }, context){
    const Article = await Articles.findById(articleId)
    if (Article) {
      return await Article.likeArticle(userId, optn)
    }
  },
  
  async toggleViews(_: any, { articleId, userId, optn }, context){
    const Article = await Articles.findById(articleId)
    if (Article) {
      return await Article.readArticle(userId, optn)
    }
  },

  async toggleSaves(_: any, { articleId, userId, optn }, context){
    const Article = await Articles.findById(articleId)
    if (Article) {
      return await Article.saveArticle(userId, optn)
    }
  },
}

export const ArticleQueries = {
  async articles(_:any, { after, limit, before }){
    const articles = await Articles.find({})
    // console.log(articles)
    if(!after && !before){
      after = articles[0]._id.toString()
    }

    let pageInfo;
    let Response;

    
    const Edges = articles.map((article) => {
      // console.log(article)
      return ({
        cursor: article._id.toString(),
        node: { Article: article }
      })
    })


    if(before && after){
      throw new UserInputError("cannot use before and after inside a single query")
    }

    if(before){
      pageInfo = {
        endCursor: articles[
          Edges.indexOf(
            Edges.find(e => e.node.Article._id.toString() == before )
          ) - limit + 1
        ]._id.toString(),
        hasNextPage: Edges.length % limit === 0 
      }

      Response = {
        pageInfo,
        count: Edges.length,
        edges: Edges.slice(
          Edges.indexOf(
            Edges.find(e => e.node.Article._id.toString() == before )
          ),
          Edges.indexOf(
            Edges.find(e => e.node.Article._id.toString() == before )
          ) + limit
        )
      }

    } else {
        pageInfo = {
        endCursor: articles[
          Edges.indexOf(
            Edges.find(e => e.node.Article._id.toString() == after )
          ) + limit - 1
        ]._id.toString(),
        hasNextPage: Edges.length % limit === 0
      }

      Response = {
        pageInfo,
        count: Edges.length,
        edges: Edges.slice(
          Edges.indexOf(
            Edges.find(e => e.node.Article._id.toString() == after )
          ),
          Edges.indexOf(
            Edges.find(e => e.node.Article._id.toString() == after )
          ) + limit
        )
        }
    }
    
    console.log(Edges)
    
    // console.log(Response)
    return Response
  },
  
  async article(_:any, { id }, context){
    const article = await Articles.findById(id)
    return article
  }
}

export const Article = {
  async comments(parent:any){
    return await Comments.find({ articleId: parent._id})
  }
}

export default ArticleMutations
