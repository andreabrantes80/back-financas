import { Request, Response } from "express";
import { ListGoalsService } from "../../services/listGoals/ListGoalsService";

class ListGoalsController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const service = new ListGoalsService();
    const goals = await service.execute(user_id);

    return res.json(goals);
  }
}

export { ListGoalsController };