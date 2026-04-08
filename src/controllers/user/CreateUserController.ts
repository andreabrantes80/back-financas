import {Request, Response }from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'

class CreateUserController{
  async handle(request: Request, response:Response){
    const {name, email, password, balance} = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
      balance: balance !== undefined ? balance : 0
    })

    return response.json(user);

  }
}

export { CreateUserController }