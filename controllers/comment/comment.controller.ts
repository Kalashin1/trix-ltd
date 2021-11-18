import { CreateContextOptions } from "vm";
import Comments from "../../data/models/comment.model";
import UserModel from "../../data/models/user.model";
import { CommentInterface, CreateChildComment, CreateComment } from "../../utils/interface";
import { UserInputError } from "apollo-server";

export const CommentQueries = {
  async comments(_: any, { articleId, limit, after, before }){
    const comments = await Comments.find({ articleId })
    // console.log(comments)
    if(!after && !before){
      after = comments[0]._id.toString()
    }

    let pageInfo;
    let Response;

    
    const Edges = comments.map((comment) => {
      // console.log(comment)
      return ({
        cursor: comment._id.toString(),
        node: { Comment: comment }
      })
    })


    if(before && after){
      throw new UserInputError("cannot use before and after inside a single query")
    }

    if(before){
      pageInfo = {
        endCursor: comments[
          Edges.indexOf(
            Edges.find(e => e.node.Comment._id.toString() == before )
          ) - limit + 1
        ]._id.toString(),
        hasNextPage: Edges.length % limit === 0 
      }

      Response = {
        pageInfo,
        count: Edges.length,
        edges: Edges.slice(
          Edges.indexOf(
            Edges.find(e => e.node.Comment._id.toString() == before )
          ),
          Edges.indexOf(
            Edges.find(e => e.node.Comment._id.toString() == before )
          ) + limit
        )
      }

    } else {
        pageInfo = {
        endCursor: comments[
          Edges.indexOf(
            Edges.find(e => e.node.Comment._id.toString() == after )
          ) + limit - 1
        ]._id.toString(),
        hasNextPage: Edges.length % limit === 0
      }

      Response = {
        pageInfo,
        count: Edges.length,
        edges: Edges.slice(
          Edges.indexOf(
            Edges.find(e => e.node.Comment._id.toString() == after )
          ),
          Edges.indexOf(
            Edges.find(e => e.node.Comment._id.toString() == after )
          ) + limit
        )
        }
    }
    
    console.log(Edges)
    
    // console.log(Response)
    return Response
  },
  async comment(_:any, { id }){
    return await Comments.findById(id)
  }
}


export const CommentMutations = {
  async createComment(_:any, { comment }){ 
    return await Comments.createComment(comment)
  },
  async editComment(_:any, { comment }){
    return await Comments.editComment(comment)
  },
  async deleteComment(_:any, { comment }){
    return await Comments.deleteComment(comment)
  },
  async likeComment(_:any, { userId, optn, commentId }){
    const Comment = await Comments.findById(commentId)
    return await Comment.likeComment(userId, optn)
  },
  async createChildComment(_:any, { comment }){
    const Comment = await Comments.findById(comment.parentCommentId);
    if(Comment){
      return await Comment.comment(comment)
    }
    throw Error('No comment exists with that id')
  }
}

export const Comment = {
  async comments(parent: any){
    const comments = Comments.find({ parentCommentId: parent._id})
    return comments
  },
  async user(parent: CommentInterface){
    const User = await UserModel.findById(parent.userId)
    return User
  }
}