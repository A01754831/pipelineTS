import dynamodb from "../services/dynamoService";
import joi from "joi";
import {PREFIX_NAME} from "../config";

const ClienteModel = dynamodb.define('cliente', {
    hashKey: 'ClienteID',
    timestamps:false,
    schema:{
        ClienteID:dynamodb.types.uuid(),
        nombre:joi.string(),
        correo:joi.string(),
        celular:joi.number()
    },
    tableName: `Cliente${PREFIX_NAME}`
})

dynamodb.createTables((err)=>{
    if(err){
        return console.log(err);
    }

    console.log("Tablas creadas");
})

export default ClienteModel;