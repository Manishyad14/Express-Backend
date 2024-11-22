import { DataTypes, sequelize } from "../lib/index.js";

const book = sequelize.define("book", {
  title: DataTypes.TEXT,
  author: DataTypes.TEXT,
  description: DataTypes.TEXT,
  genre: DataTypes.TEXT,
});

export { book };
