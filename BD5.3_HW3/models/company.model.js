import { DataTypes, sequelize } from "../lib/index.js";

const company = sequelize.define("employee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: DataTypes.TEXT,
    industry: DataTypes.TEXT,
    foundedYear: DataTypes.INTEGER,
    headquarters: DataTypes.TEXT,
  revenue : DataTypes.INTEGER
});

export { company };


