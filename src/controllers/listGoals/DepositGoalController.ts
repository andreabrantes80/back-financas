import { Request, Response } from "express";
import { DepositGoalService } from "../../services/listGoals/DepositGoalService";

class DepositGoalController {
  async handle(req: Request, res: Response) {
    try {
      const { goal_id, value } = req.body;
      const user_id = req.user_id;

      // 🔒 validação básica
      if (!goal_id || !value) {
        return res.status(400).json({
          error: "Dados inválidos"
        });
      }

      const service = new DepositGoalService();

      const result = await service.execute({
        goal_id,
        user_id,
        value: Number(value)
      });

      return res.json(result);

    } catch (error) {
       if (error instanceof Error) {
    return res.status(400).json({
      error: error.message
    });
  }
      return res.status(400).json({
        error: "Erro ao depositar na meta"
      });
    }
  }
}

export { DepositGoalController };