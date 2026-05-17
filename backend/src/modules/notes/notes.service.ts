import { AppError } from "../../shared/errors/AppError.js";
import { notesRepository } from "./notes.repository.js";
import type { CreateNoteInput, UpdateNoteInput } from "./notes.schemas.js";
import { createEmbedding } from "../ai/embedding.service.js";
import { automationService } from "../../integrations/automation/automation.service.js";

export const notesService = {
  async createNote(userId: string, input: CreateNoteInput) {
    const note = await notesRepository.create({
      userId,
      title: input.title,
      content: input.content,
    });

    const embeddingText = `${note.title}\n\n${note.content}`;
    const embedding = await createEmbedding(embeddingText);

    await notesRepository.updateEmbedding(note.id, userId, embedding);

    await automationService.emit("note.created", {
      userId,
      note,
    });

    return note;
  },

  async getNotes(userId: string, page = 1, limit = 10) {
    const safePage = Math.max(page, 1);
    const safeLimit = Math.min(Math.max(limit, 1), 50);
    const offset = (safePage - 1) * safeLimit;

    return notesRepository.findManyByUserId(userId, safeLimit, offset);
  },

  async getNoteById(noteId: string, userId: string) {
    const note = await notesRepository.findByIdAndUserId(noteId, userId);

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    return note;
  },

  async updateNote(noteId: string, userId: string, input: UpdateNoteInput) {
    const note = await notesRepository.findByIdAndUserId(noteId, userId);

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    const updatedNote = await notesRepository.update({
      id: noteId,
      userId,
      title: input.title,
      content: input.content,
      summary: input.summary,
      isArchived: input.isArchived,
    });

    if (!updatedNote) {
      throw new AppError("Failed to update note", 500);
    }

    if (input.title || input.content) {
      const embeddingText = `${updatedNote.title}\n\n${updatedNote.content}`;
      const embedding = await createEmbedding(embeddingText);

      await notesRepository.updateEmbedding(updatedNote.id, userId, embedding);
    }

    await automationService.emit("note.updated", {
      userId,
      note: updatedNote,
      changes: input,
    });

    return updatedNote;
  },

  async deleteNote(noteId: string, userId: string) {
    const note = await notesRepository.findByIdAndUserId(noteId, userId);

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    await notesRepository.delete(noteId, userId);

    await automationService.emit("note.deleted", {
      userId,
      note,
    });
  },

  async archiveNote(noteId: string, userId: string) {
    const note = await notesRepository.findByIdAndUserId(noteId, userId);

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    const archivedNote = await notesRepository.archive(noteId, userId);

    await automationService.emit("note.archived", {
      userId,
      note: archivedNote,
    });

    return archivedNote;
  },

  async unarchiveNote(noteId: string, userId: string) {
    const note = await notesRepository.findByIdAndUserId(noteId, userId);

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    const unarchivedNote = await notesRepository.unarchive(noteId, userId);

    await automationService.emit("note.unarchived", {
      userId,
      note: unarchivedNote,
    });

    return unarchivedNote;
  },
};
