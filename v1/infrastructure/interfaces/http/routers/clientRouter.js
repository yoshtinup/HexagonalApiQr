
import express from 'express';

import { ClientRepository } from '../../../adapters/repositories/ClientRepository.js';
import { ClientController } from '../../../adapters/controllers/ClientController.js';

export const clientRouter = express.Router();

const clientRepository = new ClientRepository();
const clientController = new ClientController(clientRepository);

// Definir la ruta POST /clients
clientRouter.post('/clients', (req, res) => clientController.createClient(req, res));
clientRouter.get('/clients/:id', (req, res) => clientController.getClientById(req, res));
clientRouter.get('/clients', (req, res) => clientController.getAllClients(req, res));
clientRouter.delete('/clients/:id', (req, res) => clientController.deleteClientById(req, res));
clientRouter.put('/clients/:id', (req, res) => clientController.updateClientById(req, res));

