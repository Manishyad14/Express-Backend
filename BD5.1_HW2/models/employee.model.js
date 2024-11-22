import { DataTypes, sequelize } from "../lib/index.js";

const employee = sequelize.define("employee", {
  name: DataTypes.TEXT,
  department: DataTypes.TEXT,
  salary: DataTypes.INTEGER,
  designation: DataTypes.TEXT,
});

export { employee };
