
import { IClientRepository } from '../../../domain/ports/IClientRepository.js';
import { db } from '../../database/mysql.js';

export class ClientRepository extends IClientRepository {
  // Método para crear un nuevo cliente en la base de datos
  async getAllClients() {
    const sql = "SELECT * FROM registro";
    try {
      const [data] = await db.query(sql);
      return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error retrieving clients');
    }
  }
  async getClientById(id) {
    const sql = "SELECT * FROM registro WHERE id=?";
    const params = [id];
    try {
      const [result] = await db.query(sql, params);
      return result[0]; // Devolvemos el primer resultado ya que la búsqueda es por ID
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error retrieving client by ID');
    }
  }

  async createNewClient(client) {
    const sql = "INSERT INTO registro(nombre, apellido, telefono, telefonoTaxi) VALUES (?, ?, ?, ?)";
  
    // Convertir valores undefined a null
    const params = [
      client.nombre ?? null,
      client.apellido ?? null,
      client.telefono ?? null,
      client.telefonoTaxi ?? null,
    ];
  
    try {
      const [resultado] = await db.query(sql, params);
      return {
        id: resultado.insertId,
        nombre: client.nombre,
        apellido: client.apellido,
        telefono: client.telefono,
        telefonoTaxi: client.telefonoTaxi,
      };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error creating new client');
    }
  }

  async updateClientById(id, client) {
    const sql = "UPDATE registro SET nombre = ?, apellido = ?, telefono = ?, telefonoTaxi = ? WHERE id = ?";
    const params = [
      client.nombre ?? null,
      client.apellido ?? null,
      client.telefono ?? null,
      client.telefonoTaxi ?? null,
      id
    ];
    try {
      const [result] = await db.query(sql, params);
      if (result.affectedRows === 0) {
        throw new Error('Client not found');
      }
      return result;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error updating client');
    }
  }
  
  async deleteClientById(id) {
    const sql = 'DELETE FROM registro WHERE id = ?';
    const params = [id];
    try {
      const [result] = await db.query(sql, params);
      return result.affectedRows > 0; // Devuelve `true` si se eliminó un registro, `false` si no
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error deleting client');
    }
  }
}


