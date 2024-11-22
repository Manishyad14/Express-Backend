import { DataTypes, sequelize } from "../lib/index.js";

const post = sequelize.define("post", {
  name: DataTypes.TEXT,
  position: DataTypes.TEXT,
  nationality: DataTypes.TEXT,
  age: DataTypes.INTEGER,
  jerseyNumber: DataTypes.INTEGER,
});

export { post };
