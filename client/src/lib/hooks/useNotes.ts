import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notesService } from "../../services/notes.service";
import type { UpdateNoteInput } from "../../types/note.types";

export function useNotes() {
  return useQuery({
    queryKey: ["notes"],

    queryFn: notesService.getNotes,
  });
}

export function useNote(id: string) {
  return useQuery({
    queryKey: ["notes", id],
    queryFn: () => notesService.getNote(id),
    enabled: Boolean(id),
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notesService.createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notesService.deleteNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}

export function useNotesStats() {
  const { data } = useNotes();

  const totalNotes = data?.length || 0;

  const summarizedNotes = data?.filter((note) => note.summary).length || 0;

  const archivedNotes = data?.filter((note) => note.is_archived).length || 0;

  return {
    totalNotes,
    summarizedNotes,
    archivedNotes,
  };
}

export function useArchiveNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notesService.archiveNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}

export function useUnarchiveNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notesService.unarchiveNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateNoteInput }) =>
      notesService.updateNote(id, input),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}
