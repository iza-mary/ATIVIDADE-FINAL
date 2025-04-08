import { Router } from "express";
import CandidatoControle from "../controller/candidatocontrole.js";

const rotaCandidatos = Router();
const candidatoCtrl = new CandidatoControle();

rotaCandidatos.get("/:cpf", candidatoCtrl.consultar);
rotaCandidatos.get("/", candidatoCtrl.consultar);
rotaCandidatos.post("/", candidatoCtrl.gravar);
rotaCandidatos.put("/", candidatoCtrl.alterar);
rotaCandidatos.patch("/", candidatoCtrl.alterar);
rotaCandidatos.delete("/", candidatoCtrl.excluir);

export default rotaCandidatos;
