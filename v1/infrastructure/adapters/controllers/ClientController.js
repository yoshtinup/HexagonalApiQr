import { CreateClient }  from "../../../application/Clientes/CreateClient.js";
import { GetAllClients } from "../../../application/Clientes/GetAllClients.js";
import { GetClientById } from "../../../application/Clientes/GetClientById.js";
import { DeleteClientById } from "../../../application/Clientes/DeleteClientById.js";
import { UpdateClientById } from "../../../application/Clientes/UpdateClientById.js";

export class ClientController {
  constructor(clientRepository) {
    this.createClientUseCase = new CreateClient(clientRepository);
    this.getAllClientsUseCase = new GetAllClients(clientRepository);
    this.getClientByIdUseCase = new GetClientById(clientRepository);
    this.deleteClientByIdUseCase = new DeleteClientById(clientRepository);
    this.updateClientByIdUseCase = new UpdateClientById(clientRepository);
  }
  // Método para manejar la solicitud HTTP POST /clients
  async createClient(req, res) {
    try {
      const { nombre, apellido, telefono, telefonoTaxi } = req.body;
  
      // Validar que los campos obligatorios estén presentes y no sean undefined
      if (typeof telefono === 'undefined' || typeof telefonoTaxi === 'undefined') {
        return res.status(400).json({ message: 'Phone numbers are required' });
      }
  
      const clientData = { nombre: nombre ?? '', apellido: apellido ?? '', telefono, telefonoTaxi };
      const newClient = await this.createClientUseCase.execute(clientData);
      res.status(201).json(newClient);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  

  async getAllClients(req, res) {
    try {
      const clients = await this.getAllClientsUseCase.execute();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getClientById(req, res) {
    try {
      const { id } = req.params;
      const client = await this.getClientByIdUseCase.execute(id);
      if (client) {
        res.status(200).json(client);
      } else {
        res.status(404).json({ message: 'Client not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async updateClientById(req, res) {
    try {
      const { id } = req.params;
      const clientData = req.body;

      // Validar que los datos estén presentes y no sean undefined
      if (!clientData.nombre || !clientData.apellido || !clientData.telefono || !clientData.telefonoTaxi) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const updatedClient = await this.updateClientByIdUseCase.execute(id, clientData);
      res.status(200).json({ message: 'Client updated successfully', updatedClient });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async deleteClientById(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.deleteClientByIdUseCase.execute(id);
      if (deleted) {
        res.status(200).json({ message: 'Client deleted successfully' });
      } else {
        res.status(404).json({ message: 'Client not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

