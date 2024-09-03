// models/Post.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './database'; // Adjust the path if necessary

interface PostAttributes {
  id: number;
  title: string;
  content: string;
  published: boolean;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public published!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    content: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'posts',
    sequelize, // Pass the Sequelize instance here
  }
);

export default Post;
