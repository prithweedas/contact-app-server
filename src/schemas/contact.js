export default `
    type Contact {
        id: Int!
        name: String!
        phone: String!
        email: String!
    }

    type Query {
        getContact(id:Int!):Contact!
    }

    type Mutation{
        createContact(name: String!, email: String!, phone: String!): Contact!
    }
`
