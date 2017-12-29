import jwt from "jsonwebtoken"
import _ from "lodash"
import bcrypt from "bcrypt"

export const tryLogin = async (email, password, models, SECRET, SECRET2) => {
  const user = await models.User.findOne({ where: { email }, raw: true })
  if (!user) {
    return {
      ok: false,
      errors: [
        {
          path: "email",
          message: "Wrong Email"
        }
      ]
    }
  }

  const valid = bcrypt.compare(password, user.password)
  if (!valid) {
    return {
      ok: false,
      errors: [
        {
          path: "password",
          message: "Wrong Password"
        }
      ]
    }
  }

  const { token, refreshToken } = await createToken(user, SECRET, SECRET2)

  const response = {
    ok: true,
    token,
    refreshToken
  }

  return response
}

export const createToken = async (user, SECRET, SECRET2) => {
  const token = await jwt.sign(
    {
      user: _.pick(user, ["id", "username"])
    },
    SECRET,
    {
      expiresIn: "1h"
    }
  )

  const refreshToken = await jwt.sign(
    {
      user: _.pick(user, ["id"])
    },
    SECRET2,
    {
      expiresIn: "3d"
    }
  )

  return { token, refreshToken }
}

export const refreshTokens = async (refreshToken, models, SECRET, SECRET2) => {
  let userId = 0
  try {
    const { user } = await jwt.verify(refreshToken, SECRET2)
    userId = user.id
  } catch (err) {
    return {}
  }

  if (!userId) {
    return {}
  }

  const user = await models.User.findOne({ where: { id: userId }, raw: true })

  if (!user) {
    return {}
  }
  const newToken = await createToken(user, SECRET, SECRET2)

  return {
    token: newToken.token,
    refreshToken: newToken.refreshToken,
    user
  }
}
