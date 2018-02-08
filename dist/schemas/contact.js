"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n    type Contact {\n        id: Int!\n        name: String!\n        phone: String!\n        email: String!\n    }\n\n    type Query {\n        getAllContacts:[Contact!]\n    }\n\n    type Subscription {\n        contactAdded(owner:Int!): Contact\n    }\n\n    type ContactResponse {\n        ok: Boolean!\n        errors: [Error!]\n    }\n\n    type Mutation{\n        createContact(name: String!, email: String!, phone: String!): ContactResponse!\n    }\n";