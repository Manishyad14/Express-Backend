import { DataTypes, sequelize } from "../lib/index.js";

const post = sequelize.define("post", {
  title: DataTypes.TEXT,
  content: DataTypes.TEXT,
  author: DataTypes.TEXT,
 
});

export { post };
