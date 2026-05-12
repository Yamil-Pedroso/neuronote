import { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { tagsService } from "./tags.service.js";

export const tagsController = {
  createTag: asyncHandler(async (req: Request, res: Response) => {
    const tag = await tagsService.createTag(req.user!.id, req.body);

    res.status(201).json({
      success: true,
      message: "Tag created successfully",
      data: { tag },
    });
  }),

  getTags: asyncHandler(async (req: Request, res: Response) => {
    const tags = await tagsService.getTags(req.user!.id);

    res.status(200).json({
      success: true,
      data: { tags },
    });
  }),

  deleteTag: asyncHandler(async (req: Request, res: Response) => {
    await tagsService.deleteTag(req.params.id as string, req.user!.id);

    res.status(200).json({
      success: true,
      message: "Tag deleted successfully",
    });
  }),

  attachTagToNote: asyncHandler(async (req: Request, res: Response) => {
    const result = await tagsService.attachTagToNote(
      req.params.noteId as string,
      req.params.tagId as string,
      req.user!.id,
    );

    res.status(200).json({
      success: true,
      message: result.alreadyAttached
        ? "Tag was already attached to note"
        : "Tag attached to note successfully",
    });
  }),

  removeTagFromNote: asyncHandler(async (req: Request, res: Response) => {
    await tagsService.removeTagFromNote(
      req.params.noteId as string,
      req.params.tagId as string,
      req.user!.id,
    );

    res.status(200).json({
      success: true,
      message: "Tag removed from note successfully",
    });
  }),
};
