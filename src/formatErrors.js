import _ from "lodash"

export default (e, models) => {
  if (e instanceof models.sequelize.ValidationError) {
    const errors = e.errors.map(x => _.pick(x, ["path", "message"]))
    return errors
  }
  return [{ path: "name", message: "something went wrong" }]
}
