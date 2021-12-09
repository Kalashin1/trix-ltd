import { UserInputError } from "apollo-server";
import Exchanges from "../../data/models/exchange.model";
import { verifyToken } from "../../utils/jwt-handler";

export const ExchangeMutations = {

  async createExchange(_: any, { exchange }, context) {
    let token = context.req.headers.usertoken
    let verifiedToken = verifyToken(token, process.env.JWT_SECRETE)
    // @ts-ignore
    if (verifiedToken === false) throw new ValidationError("You are not loggedIn")
    return await Exchanges.create({ ...exchange })
  },
}

export const ExchangeQueries = {
  async exchanges(_: any, { before, after, limit }, context) {
    try {
      let token = context.req.headers.usertoken
      let verifiedToken = verifyToken(token, process.env.JWT_SECRETE)
      // @ts-ignore
      if (verifiedToken === false) throw new ValidationError("You are not loggedIn")
      const exchanges = await Exchanges.find({})
      // console.log(context.req.headers.usertoken);
      /**
       * * If before and after is not provided throw an error 
       */
      if (!before && (!after)) {
        after = exchanges[0].date
      }
      /**
       * * if no limit is provided use the default limit.
       */
      if (!limit) {
        limit == 5  // * TODO change this limit to 10 later
      }
      /**
       * * if before and after is provided at the same time, throw an error.
       */
      if (before && after) {
        throw new UserInputError('before and after cannot be provided at once.');
      }
      /**
       * * if only before is provided,
       */

      if (before && (!after)) {
        // * get the current cursor the user passed in
        const currentCursor = exchanges.find(exchange => exchange.date == before).date;
        // * Map the edges 
        const Edges = exchanges.map(exchange => {
          return {
            cursor: exchange.date,
            node: { Exchange: exchange }
          }
        })

        console.log(Edges[0].node.Exchange.date)
        // * Generate page info
        const pageInfo = {
          endCursor: exchanges[
            exchanges.indexOf(exchanges.find(exchange => exchange.date == before)) - limit + 1
          ].date,

          hasNextPage: () => {

            const endCursor = exchanges.indexOf(exchanges.find(exchange => exchange.date == before)) - limit + 1

            // console.log(exchanges.slice(0, endCursor).length, limit)
            if (exchanges.slice(0, endCursor).length >= limit) {
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
              Edges.find(e => e.node.Exchange.date == before)
            ) - limit,
            // * Stop at the cursor
            Edges.indexOf(
              Edges.find(e => e.node.Exchange.date == before)
            )
          )
        }
        return Response
      }

      if (!before && (after)) {
        // * get the current cursor the user passed in
        const currentCursor = exchanges.find(exchange => exchange.date == after).date;
        // * Map the edges 
        const Edges = exchanges.map(exchange => {
          return {
            cursor: exchange.date,
            node: { Exchange: exchange }
          }
        })
        // * Generate page info
        const pageInfo = {
          endCursor: exchanges[
            exchanges.indexOf(exchanges.find(exchange => exchange.date == after))
          ].date,

          hasNextPage: () => {

            const endCursor = exchanges.indexOf(exchanges.find(exchange => exchange.date == after)) + limit
            console.log(exchanges.slice(endCursor, exchanges.length).length, limit)
            if (exchanges.slice(endCursor, exchanges.length).length >= limit) {
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
              Edges.find(e => e.node.Exchange.date == after)
            ),
            // * Get n number of edges before the cursor
            Edges.indexOf(
              Edges.find(e => e.node.Exchange.date == after)
            ) + limit
          )
        }
        return Response
      }
    }
    catch (error) {
      console.log(error)
    }
  },

  async exchange(_: any, { id }, context) {
    let token = context.req.headers.usertoken
    let verifiedToken = verifyToken(token, process.env.JWT_SECRETE)
    // @ts-ignore
    if (verifiedToken === false) throw new ValidationError("You are not loggedIn")
    return await Exchanges.findById(id)
  }
}


export default ExchangeMutations
