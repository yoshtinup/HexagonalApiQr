
import express from 'express';


import { EmainRepository } from '../../../adapters/Services/EmainRepository.js';
import { MensageController } from '../../../adapters/controllers/MensageController.js';



export const EmailRouter = express.Router();

const servicesRepository = new EmainRepository();
const servicesController = new MensageController(servicesRepository);

// Definir la ruta POST /clients
EmailRouter.post('/correos', (req, res) => servicesController.sendCorreo(req, res));


