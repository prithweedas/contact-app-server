import FormatErrors from "../formatErrors"
import { PubSub } from "graphql-subscriptions"
import { withFilter } from "graphql-subscriptions"

const pubsub = new PubSub()

export default {
  Query: {
    getAllContacts: async (parent, args, { models, user }) =>
      await models.Contact.findAll({
        where: { owner: user.id }
      })
  },

  Subscription: {
    contactAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("NEW_CONTACT_ADDED"),
        (payload, variables) => {
          return payload.owner === variables.owner
        }
      )
    }
  },
  Mutation: {
    createContact: async (parent, args, { models, user }) => {
      try {
        const contact = await models.Contact.create({ ...args, owner: user.id })
        pubsub.publish("NEW_CONTACT_ADDED", {
          contactAdded: contact.dataValues,
          owner: user.id
        })
        return {
          ok: true
        }
      } catch (err) {
        return {
          ok: false,
          errors: FormatErrors(err)
        }
      }
    }
  }
}
