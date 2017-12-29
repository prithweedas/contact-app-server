import _ from "lodash"

export default (e, models) => {
  if (e instanceof models.sequelize.ValidationError) {
    //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
    const errors = e.errors.map(x => _.pick(x, ["path", "message"]))
    console.log("lodash", errors)
    return errors
  }
  return [{ path: "name", message: "something went wrong" }]
}
