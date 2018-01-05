import FormatErrors from "../formatErrors"

export default {
  Query: {
    getAllContacts: (parent, args, { models, user }) =>
      models.Contact.findAll({ where: { owner: user.id } })
  },
  Mutation: {
    createContact: async (parent, args, { models, user }) => {
      try {
        await models.Contact.create({ ...args, owner: user.id })
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
