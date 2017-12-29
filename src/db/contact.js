export default (sequelize, DataTypes) => {
  const Contact = sequelize.define("contact", {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phone: DataTypes.STRING
  })

  Contact.associate = models => {
    Contact.belongsTo(models.User, {
      foreignKey: {
        name: "owner",
        field: "owner"
      }
    })
  }

  return Contact
}
