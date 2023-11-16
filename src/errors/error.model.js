import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";


const Error = sequelize.define('error',{
    id:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    status:{
        type: DataTypes.STRING(20),
        allowNull:false
    },
    message:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    stack: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

export default Error