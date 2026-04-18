import { Request, Response } from "express";
import { CreateGoalService } from "../../services/listGoals/CreateGoalService";

class CreateGoalController {
  async handle(request: Request, response: Response) {

    const { name, target } = request.body;
    const user_id = request.user_id;

    const service = new CreateGoalService();

    const goal = await service.execute(name, target, user_id);

    return response.json(goal);
  }
}

export { CreateGoalController };