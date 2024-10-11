
import twilio from "twilio"
import { IExteriorService } from '../../../domain/ports/IExteriorService.js';


export class MessageRepository extends IExteriorService {
  constructor() {
    super();
    this.twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }
    async sendMessage(to, body) {
      try {
        const message = await this.twilioClient.messages.create({
          body: body,
          from: process.env.TWILIO_PHONE_NUMBER, // Se obtiene desde el archivo .env
          to: to,
        });
    
        console.log(`Mensaje enviado a ${to}: ${message.body}`);
        return message.sid;
      } catch (error) {
        throw new Error(`Error al enviar el mensaje: ${error.message}`);
      }
    }
}
