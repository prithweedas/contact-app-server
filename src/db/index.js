import Sequelize from "sequelize"

// const sequelize = new Sequelize("contact_app", "postgres", "prithweedas", {
//   dialect: "postgres",
//   operatorsAliases: Sequelize.Op,
//   host: "localhost",
//   define: {
//     underscored: true
//   }
// })

const sequelize = new Sequelize(
  process.env.MSSQL_DBNAME,
  process.env.MSSQL_USERNAME,
  process.env.MSSQL_PASSWORD,
  {
    host: process.env.MSSQL_HOST,
    dialect: "mssql",
    operatorsAliases: Sequelize.Op,
    dialectOptions: {
      encrypt: true
    }
  }
)

const models = {
  User: sequelize.import("./user.js"),
  Contact: sequelize.import("./contact.js")
}

Object.keys(models).forEach(modelName => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize
export default models
