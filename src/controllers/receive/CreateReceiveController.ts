import {Request, Response }from 'express'
import { CreateReceiveService } from '../../services/receive/CreateReceiveService'

class CreateReceiveController{
  async handle(request: Request, response: Response) {
    try {

      const {
        description,
        value,
        type,
        date
       } = request.body;

       const user_id = request.user_id;

      const createReceiveService = new CreateReceiveService();

      const user = await createReceiveService.execute({
        description,
        value,
        type,
        date,
        user_id,
      })

      return response.json(user);

    } catch (err) {

      console.log("ERRO CREATE RECEIVE:", err);
      return response.status(500).json({ error: "Erro ao criar registro" });


    }

  }
}

export { CreateReceiveController }