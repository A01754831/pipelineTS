import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import ClienteModel from "../modelsNOSQL/clienteNOSQL";

class ClienteController extends AbstractController {
    
    // Singleton
    // Atributos de clase
    private static _instance: ClienteController;
    public static get instance():ClienteController {
        if (this._instance){
            return this._instance;
        }
        this._instance = new ClienteController("cliente");
        return this._instance;
    }

    protected initRoutes(): void {
        //POSTS
        this.router.post("/crear", this.postCrear.bind(this));

        //GETS
        this.router.get("/consultar", this.getConsultar.bind(this));

    }

    private async getConsultar(req: Request, res: Response){
        try{
            const clientes = await ClienteModel.scan().exec().promise();
            res.status(200).send(clientes[0].Items);
            console.log(clientes);
        }
        catch(err){
            console.log(err);
            res.status(500).send("Error al consultar departamentos")
        }
    } 

    private async postCrear(req: Request, res: Response){
        try{
            await ClienteModel.create(req.body);
            console.log("Cliente creado");
            res.status(200).send("Cliente creado");
        }
        catch(err){
            console.error(err);
            res.status(500).send("Error al crear el cliente")
        }
    }
}

export default ClienteController;