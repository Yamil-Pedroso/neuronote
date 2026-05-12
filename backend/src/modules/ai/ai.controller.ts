import { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { aiService } from "./ai.service.js";

export const aiController = {
  summarizeNote: asyncHandler(async (req: Request, res: Response) => {
    const result = await aiService.summarizeNote(
      req.params.id as string,
      req.user!.id,
    );

    res.status(200).json({
      success: true,
      message: "Note summarized successfully",
      data: result,
    });
  }),

  generateTitle: asyncHandler(async (req: Request, res: Response) => {
    const result = await aiService.generateTitle(
      req.params.id as string,
      req.user!.id,
    );

    res.status(200).json({
      success: true,
      message: "Title generated successfully",
      data: result,
    });
  }),

  suggestTags: asyncHandler(async (req: Request, res: Response) => {
    const result = await aiService.suggestTags(
      req.params.id as string,
      req.user!.id,
    );

    res.status(200).json({
      success: true,
      message: "Tags suggested successfully",
      data: result,
    });
  }),
};
