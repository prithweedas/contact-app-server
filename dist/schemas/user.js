"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n    type User {\n        id: Int!\n        username: String!\n        email: String!\n        contacts: [Contact!]\n    }\n    type RegisterResponse{\n       ok: Boolean!\n       errors:[Error!] \n    }\n\n    type LoginResponse{\n       ok: Boolean!\n       token: String\n       refreshToken: String\n       errors:[Error!] \n    }\n    type authResponse{\n        auth: Boolean!\n        userId: Int\n    }\n    type Error{\n        path: String!\n        message:String\n    }\n    type Query {\n        getUser(email:String!):User!\n        getAllUsers:[User!]\n        isAuthenticated: authResponse!\n    }\n\n    type Mutation{\n        register(username: String!, email: String!, password: String!): RegisterResponse!\n        login(email: String!, password: String!): LoginResponse!\n    }\n";