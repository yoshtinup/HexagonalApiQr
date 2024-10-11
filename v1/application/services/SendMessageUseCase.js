// v1/application/message/SendMessageUseCase.js

export class SendMessageUseCase {
    constructor(servicesRepository) {
      this.servicesRepository = servicesRepository; // Inyección del puerto
    }
  
    /**
     * Ejecutar el envío de un mensaje.
     * @param {string} to - El número de teléfono del destinatario.
     * @param {string} body - El contenido del mensaje.
     * @returns {Promise<string>} - ID del mensaje enviado.
     */
    async execute(to, body) {
      return await this.servicesRepository.sendMessage(to, body);
    }
  }
  
  