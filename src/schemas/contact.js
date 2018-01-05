export default `
    type Contact {
        id: Int!
        name: String!
        phone: String!
        email: String!
    }

    type Query {
        getAllContacts:[Contact!]
    }

    type ContactResponse {
        ok: Boolean!
        errors: [Error!]
    }

    type Mutation{
        createContact(name: String!, email: String!, phone: String!): ContactResponse!
    }
`
