import { AppError } from "../../shared/errors/AppError.js";
import { notesRepository } from "../notes/notes.repository.js";
import { tagsRepository } from "./tags.repository.js";
import type { CreateTagInput } from "./tags.schemas.js";

export const tagsService = {
  async createTag(userId: string, input: CreateTagInput) {
    return tagsRepository.create({
      userId,
      name: input.name,
      color: input.color,
    });
  },

  async getTags(userId: string) {
    return tagsRepository.findManyByUserId(userId);
  },

  async deleteTag(tagId: string, userId: string) {
    const tag = await tagsRepository.findByIdAndUserId(tagId, userId);

    if (!tag) {
      throw new AppError("Tag not found", 404);
    }

    await tagsRepository.delete(tagId, userId);
  },

  async attachTagToNote(noteId: string, tagId: string, userId: string) {
    const note = await notesRepository.findByIdAndUserId(noteId, userId);

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    const tag = await tagsRepository.findByIdAndUserId(tagId, userId);

    if (!tag) {
      throw new AppError("Tag not found", 404);
    }

    const attached = await tagsRepository.attachTagToNote({
      noteId,
      tagId,
    });

    if (!attached) {
      return {
        alreadyAttached: true,
      };
    }

    return {
      alreadyAttached: false,
    };
  },

  async removeTagFromNote(noteId: string, tagId: string, userId: string) {
    const note = await notesRepository.findByIdAndUserId(noteId, userId);

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    const tag = await tagsRepository.findByIdAndUserId(tagId, userId);

    if (!tag) {
      throw new AppError("Tag not found", 404);
    }

    await tagsRepository.removeTagFromNote({
      noteId,
      tagId,
    });
  },
};
