export class RegistroCliente {
  constructor(id, nombre = '', apellido = '', telefono, telefonoTaxi) {
    this.id = id;
    this.nombre = nombre ? this.validateString(nombre) : '';
    this.apellido = apellido ? this.validateString(apellido) : '';
    this.telefono = this.validatePhoneNumber(telefono);
    this.telefonoTaxi = this.validatePhoneNumber(telefonoTaxi);
  }

  // Método para validar un número de teléfono
  validatePhoneNumber(phoneNumber) {
    const normalizedPhoneNumber = String(phoneNumber).replace(/\D/g, '').trim();
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(normalizedPhoneNumber)) {
      throw new Error('Invalid phone number');
    }

    return normalizedPhoneNumber;
  }

  // Método para validar una cadena
  validateString(value) {
    if (typeof value !== 'string') {
      throw new Error('Invalid string value');
    }
    return value.trim();
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
}
