
import { UpdateLoginById } from "../../../application/Login/UpdateLoginById.js";
import { VerifyLogin } from "../../../application/Login/VerifyLogin.js";
import { GetAllLogin } from "../../../application/Login/GetAllLogin.js";
import { GetLoginById } from "../../../application/Login/GetLoginById.js";
import { DeleteLoginById } from "../../../application/Login/DeleteLoginById.js";
import { CreateLogin } from "../../../application/Login/CreateLogin.js";
export class LoginController {
  constructor(loginRepository) {
    this.updateLoginByIdUseCase = new UpdateLoginById(loginRepository);
    this.verifyLoginUseCase = new VerifyLogin(loginRepository);
    this.getAllLoginUseCase = new GetAllLogin(loginRepository);
    this.getLoginbyidUseCase = new GetLoginById(loginRepository);
    this.deleteLoginByIdUseCase = new DeleteLoginById(loginRepository);
    this.createLoginUseCase = new CreateLogin(loginRepository);
  }
  async createLogin(req, res) {
    try {
      const { usuario, contrasena, gmail} = req.body;
  
      // Validar que los campos obligatorios estén presentes y no sean undefined
  
      const loginData = { usuario: usuario ?? '', contrasena: contrasena ?? '', gmail: gmail ?? ''};
      const newLogin = await this.createLoginUseCase.execute(loginData);
      res.status(201).json(newLogin);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async updateLoginById(req, res) {
    try {
      const { id } = req.params;
      const { usuario, contrasena, gmail } = req.body;

      // Validar que todos los campos estén presentes y no sean undefined ni vacíos
      if (!usuario || !gmail || !contrasena) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const loginData = { usuario, contrasena, gmail };
      const updatedLogin = await this.updateLoginByIdUseCase.execute(id, loginData);
      res.status(200).json({ message: 'Login updated successfully', updatedLogin });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async verifyLogin(req, res) {
    try {
      const { usuario, contrasena } = req.body;

      // Validar que ambos campos estén presentes
      if (!usuario || !contrasena) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      const verifiedUser = await this.verifyLoginUseCase.execute(usuario, contrasena);
      res.status(200).json({ message: 'Login successful', user: verifiedUser });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async getAllLogins(req, res) {
    try {
      const login = await this.getAllLoginUseCase.execute();
      res.status(200).json(login);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getLoginById(req, res) {
    try {
      const { id } = req.params;
      const login = await this.getLoginbyidUseCase.execute(id);
      if (login) {
        res.status(200).json(login);
      } else {
        res.status(404).json({ message: 'Client not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async deleteLoginById(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.deleteLoginByIdUseCase.execute(id);
      if (deleted) {
        res.status(200).json({ message: 'Login deleted successfully' });
      } else {
        res.status(404).json({ message: 'Login not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
