import { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { notesService } from "./notes.service.js";

export const notesController = {
  createNote: asyncHandler(async (req: Request, res: Response) => {
    const note = await notesService.createNote(req.user!.id, req.body);

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: { note },
    });
  }),

  getNotes: asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const notes = await notesService.getNotes(req.user!.id, page, limit);

    res.status(200).json({
      success: true,
      data: { notes },
    });
  }),

  getNoteById: asyncHandler(async (req: Request, res: Response) => {
    const note = await notesService.getNoteById(
      req.params.id as string,
      req.user!.id,
    );

    res.status(200).json({
      success: true,
      data: { note },
    });
  }),

  updateNote: asyncHandler(async (req: Request, res: Response) => {
    const note = await notesService.updateNote(
      req.params.id as string,
      req.user!.id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: { note },
    });
  }),

  deleteNote: asyncHandler(async (req: Request, res: Response) => {
    await notesService.deleteNote(req.params.id as string, req.user!.id);

    res.status(200).json({
      success: true,
      message: `Note deleted successfully with id ${req.params.id}`,
    });
  }),

  archiveNote: asyncHandler(async (req: Request, res: Response) => {
    const note = await notesService.archiveNote(
      req.params.id as string,
      req.user!.id,
    );

    res.status(200).json({
      success: true,
      message: "Note archived successfully",
      data: { note },
    });
  }),

  unarchiveNote: asyncHandler(async (req: Request, res: Response) => {
    const note = await notesService.unarchiveNote(
      req.params.id as string,
      req.user!.id,
    );

    res.status(200).json({
      success: true,
      message: "Note unarchived successfully",
      data: { note },
    });
  }),
};
