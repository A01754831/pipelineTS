import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";


class MascotasController extends AbstractController{
    //Singleton
    //Atributo de clase
    private static _instance: MascotasController;
    //Metodo de clase
    public static get instance():AbstractController{
        if(!this._instance){
            this._instance = new MascotasController("mascotas");
        }
        return this._instance;
    }
    //Declarar todas las rutas del controlador
    protected initRoutes(): void {
        this.router.get('/testMascota',this.getTestMascota.bind(this));
        this.router.get('/consultarMascotas',this.getConsultarMascotas.bind(this));
        this.router.post('/crearMascota',this.postCrearMascota.bind(this));
        
    }
    
    //10.48.120.198

    private async postCrearMascota(req: Request,res: Response){
        try{
            console.log(req.body);
            await db.Mascotas.create(req.body); //INSERT
            console.log("Mascota registrada");
            res.status(200).send("Mascota registrada");

        }catch(error:any){
            console.log(error);
            res.status(500).send('Internal server error'+error);
        }
    }

    private async getConsultarMascotas(req: Request,res: Response){
        try{
            console.log("Consultar mascotas");
            let mascotas = await db["Mascotas"].findAll(); //SELECT * FROM Mascota;
            res.status(200).json(mascotas);

        }catch(error:any){
            console.log(error);
            res.status(500).send('Internal server error'+error);
        }
    }
    //Metodos de instancia
    private getTestMascota(req: Request,res: Response){
        try{
            console.log("Prueba exitosa");
            res.status(200).send("<h1>Prueba exitosa</h1>")
        }catch(error:any){
            console.log(error);
            res.status(500).send('Internal server error'+error);
        }
    }

}

export default MascotasController;