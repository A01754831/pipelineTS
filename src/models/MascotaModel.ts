import {Model,Sequelize} from 'sequelize';

interface MascotasAttributes {
    nombre:string;
    edad:number;
    raza:string;
}

module.exports = (sequelize:any,DataTypes:any) => {
    class Mascotas extends Model<MascotasAttributes> implements MascotasAttributes{
        public nombre!:string;
        public edad!:number;
        public raza!:string;

        static associate(models:any){

        }

    }
    Mascotas.init({
        
        nombre:{
            type:DataTypes.STRING,
            allowNull:false
        },
        edad:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        raza:{
            type:DataTypes.STRING(30),
            allowNull:false
        }
    },{
        sequelize,
        modelName:'Mascotas'
    });
    return Mascotas;

}