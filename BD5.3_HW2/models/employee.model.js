import { DataTypes, sequelize } from "../lib/index.js";

const Employee = sequelize.define("employee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: DataTypes.TEXT,
  designation: DataTypes.TEXT,
  department: DataTypes.TEXT,
  salary: DataTypes.INTEGER,
});

export { Employee };
