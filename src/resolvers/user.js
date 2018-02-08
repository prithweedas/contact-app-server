import formatErrors from "../formatErrors"
import { tryLogin } from "../auth"

export default {
  Query: {
    getUser: (parent, { email }, { models }) =>
      models.User.findOne({ where: { email } }),
    getAllUsers: (parent, args, { models, user }) => {
      return models.User.findAll()
    },
    isAuthenticated: async (parent, args, { models, user }) => {
      if (!!user.id) {
        try {
          await models.User.findOne({ where: { id: user.id } })
          return {
            auth: true,
            userId: user.id
          }
        } catch (error) {
          return {
            auth: false
          }
        }
      } else return { auth: false }
    }
  },
  Mutation: {
    register: async (parent, args, { models }) => {
      try {
        await models.User.create(args)
        return {
          ok: true
        }
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(error, models)
        }
      }
    },
    login: async (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2)
  },

  User: {
    contacts: ({ id }, args, { models }) =>
      models.Contact.findAll({ where: { owner: id } })
  }
}
