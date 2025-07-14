import "dotenv/config";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false
});

const Customers = sequelize.define("customers", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  name: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
  role: DataTypes.TEXT
}, { timestamps: false });

export { sequelize, Customers };