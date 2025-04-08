import { Router } from "express";
import PartidoControle from "../controller/partidocontrole.js";

const rotaPartidos = Router();
const partidoCtrl = new PartidoControle();

rotaPartidos.get("/:id", partidoCtrl.consultar);
rotaPartidos.get("/", partidoCtrl.consultar);
rotaPartidos.post("/", partidoCtrl.gravar);
rotaPartidos.put("/", partidoCtrl.alterar);
rotaPartidos.patch("/", partidoCtrl.alterar);
rotaPartidos.delete("/", partidoCtrl.excluir);

export default rotaPartidos;
