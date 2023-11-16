import { DataTypes } from "sequelize";
import sequelize from '../config/database/database.js' 

const Plane = sequelize.define('plane',{

    id:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        field:'plane_id'
    },
    planeNumber:{
        type:DataTypes.INTEGER,
        allowNull: false,
        field: 'plane_number'
    },
    model:{   
        type: DataTypes.STRING(20),
        allowNull: false
    },
    maxCapacity:{
        type: DataTypes.INTEGER,
        allowNull:false,
        field: 'max_capacity'
    },
    aeroline:{
        type: DataTypes.ENUM('sky','latam','startline','skyline','bianca'),
        allowNull: false
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
    }

})

export default Plane