import type { Request, Response } from "express";

import { searchService } from "./search.service.js";

export const searchController = {
  async semanticSearch(req: Request, res: Response) {
    const userId = req.user!.id;

    const results = await searchService.semanticSearch(userId, req.body);

    res.json({
      success: true,
      data: {
        results,
      },
    });
  },
};
