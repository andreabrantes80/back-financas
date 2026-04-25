import { Request, Response } from "express";
import { DeleteGoalService } from "../../services/listGoals/DeleteGoalService";

class DeleteGoalController {
  async handle(req: Request, res: Response) {

        console.log("PARAMS:", req.params);
    console.log("ID:", req.params.id);
    console.log("USER:", req.user_id);


    const goal_id = req.params.id as string;
    const user_id = req.user_id;

    const service = new DeleteGoalService();

    const result = await service.execute({ goal_id, user_id });

    return res.json(result);
  }
}

export { DeleteGoalController };