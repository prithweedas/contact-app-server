import express from "express"
import bodyParser from "body-parser"
import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import { makeExecutableSchema, addErrorLoggingToSchema } from "graphql-tools"
import { mergeTypes, fileLoader, mergeResolvers } from "merge-graphql-schemas"
import path from "path"
import cors from "cors"
import jwt from "jsonwebtoken"

import models from "./db"
import { refreshTokens } from "./auth"

const app = express()
const PORT = process.env.PORT || 3001
const endpointURL = "/graphql"
const SECRET = "xdtcfytuijnkoigkujhvwezrxdtcfygvhjplkwaerxdtcfgkmjiiugtd"
const SECRET2 =
  "fjfdkvnawoeknfejrkjmjsmvkjdafviabfvinasidjvjbfvjbjkssvjbhavhkah"

const addUser = async (req, res, next) => {
  const token = req.headers["x-token"]
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET)
      req.user = user
    } catch (err) {
      const refreshToken = req.headers["x-refresh-token"]
      const newTokens = await refreshTokens(
        refreshToken,
        models,
        SECRET,
        SECRET2
      )
      if (newTokens.token && newTokens.refreshToken) {
        res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token")
        res.set("x-token", newTokens.token)
        res.set("x-refresh-token", newTokens.refreshToken)
      }
      req.user = newTokens.user
    }
  }
  next()
}

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "schemas")))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, "resolvers")))

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

app.use(addUser)

app.use(cors("*"))
app.use(
  endpointURL,
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      models,
      SECRET,
      SECRET2,
      user: {
        id: 1
      }
    }
  })
)

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL
  })
)

models.sequelize.sync({}).then(() => {
  app.listen(PORT, err => {
    if (err) throw err
    console.log("Server running on port 3001")
  })
})
