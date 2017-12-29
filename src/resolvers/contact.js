export default {
  Query: {
    getContact: (parent, { id }, { models }) =>
      models.Contact.findOne({ where: { id } })
  },
  Mutation: {
    createContact: (parent, args, { models, user }) => {
      console.log(args, user)
      return models.Contact.create({ ...args, owner: user.id })
    }
  }
}
