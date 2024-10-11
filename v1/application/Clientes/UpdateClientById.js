export class UpdateClientById {
    constructor(clientRepository) {
      this.clientRepository = clientRepository; // Inyección del puerto (repositorio)
    }
  
    /**
     * Ejecutar la actualización de un cliente por su ID.
     * @param {number} id - El ID del cliente.
     * @param {Object} clientData - Los datos del cliente para actualizar.
     * @returns {Promise<Object>} - Los datos del cliente actualizado.
     */
    async execute(id, clientData) {
      return await this.clientRepository.updateClientById(id, clientData);
    }
  }
  