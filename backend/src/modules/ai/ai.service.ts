import { openai } from "../../config/openai.js";
import { env } from "../../config/env.js";
import { AppError } from "../../shared/errors/AppError.js";
import { notesRepository } from "../notes/notes.repository.js";
import { tagsRepository } from "../tags/tags.repository.js";

export const aiService = {
  async summarizeNote(noteId: string, userId: string) {
    const note = await notesRepository.findByIdAndUserId(noteId, userId);

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    const response = await openai.responses.create({
      model: env.OPENAI_MODEL,
      instructions:
        "You are an assistant that summarizes user notes clearly and concisely.",
      input: `
Summarize this note in 3-5 concise bullet points.

Title: ${note.title}

Content:
${note.content}
      `,
    });

    const summary = response.output_text.trim();

    const updatedNote = await notesRepository.update({
      id: note.id,
      userId,
      summary,
    });

    return {
      summary,
      note: updatedNote,
    };
  },

  async generateTitle(noteId: string, userId: string) {
    const note = await notesRepository.findByIdAndUserId(noteId, userId);

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    const response = await openai.responses.create({
      model: env.OPENAI_MODEL,
      instructions:
        "You generate short, clear, useful titles for personal notes.",
      input: `
Generate one short title for this note.
Return only the title. No quotes. No explanation.

Current title: ${note.title}

Content:
${note.content}
      `,
    });

    const title = response.output_text.trim();

    return {
      title,
    };
  },

  async suggestTags(noteId: string, userId: string) {
    const note = await notesRepository.findByIdAndUserId(noteId, userId);

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    const response = await openai.responses.create({
      model: env.OPENAI_MODEL,

      instructions: `
You suggest useful tags for organizing personal notes.

IMPORTANT:
- Return ONLY valid JSON
- Do not use markdown
- Do not use triple backticks
- Do not explain anything
- Do not add extra text

The response MUST exactly follow this shape:

{
  "tags": ["tag1", "tag2", "tag3"]
}
      `,

      input: `
Suggest 3 to 6 tags for this note.

Title: ${note.title}

Content:
${note.content}
      `,
    });

    const rawOutput = response.output_text.trim();

    const cleanedOutput = rawOutput
      .replace(/^```json/i, "")
      .replace(/^```/i, "")
      .replace(/```$/i, "")
      .trim();

    let parsed: { tags: string[] };

    try {
      parsed = JSON.parse(cleanedOutput);
    } catch {
      console.error("Invalid AI JSON output:", rawOutput);

      throw new AppError("AI returned invalid JSON", 500);
    }

    const tags = parsed.tags
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 6);

    return {
      tags,
    };
  },
};
