import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

export interface TodoAttributes {
    id: string;
    title: string;
    description?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TodoCreationAttributes extends Optional<TodoAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
    public id!: string;
    public title!: string;
    public description?: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof Todo {
    Todo.init(
        {
            id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, unique: true, defaultValue: DataTypes.UUIDV4, },
            title: { type: DataTypes.STRING(30), allowNull: false, },
            description: { type: DataTypes.TEXT, allowNull: true, },
        },
        {
            sequelize,
            modelName: 'Todo',
            tableName: 'todos',
            charset: 'UTF-8',
            timestamps: true,
        }
    );
    return Todo;
}