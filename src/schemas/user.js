export default `
    type User {
        id: Int!
        username: String!
        email: String!
        contacts: [Contact!]
    }
    type RegisterResponse{
       ok: Boolean!
       errors:[Error!] 
    }

    type LoginResponse{
       ok: Boolean!
       token: String
       refreshToken: String
       errors:[Error!] 
    }
    type authResponse{
        auth: Boolean!
        userId: Int
    }
    type Error{
        path: String!
        message:String
    }
    type Query {
        getUser(email:String!):User!
        getAllUsers:[User!]
        isAuthenticated: authResponse!
    }

    type Mutation{
        register(username: String!, email: String!, password: String!): RegisterResponse!
        login(email: String!, password: String!): LoginResponse!
    }
`
