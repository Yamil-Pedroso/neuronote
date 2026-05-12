// lib/hooks/useTags.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tagsService } from "../../services/tags.service";

type NoteTagPayload = {
  noteId: string;
  tagId: string;
};

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: tagsService.getTags,
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tagsService.createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
}

export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tagsService.deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}

export function useAttachTagToNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, tagId }: NoteTagPayload) =>
      tagsService.attachTagToNote(noteId, tagId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note", variables.noteId] });
    },
  });
}

export function useRemoveTagFromNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, tagId }: NoteTagPayload) =>
      tagsService.removeTagFromNote(noteId, tagId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note", variables.noteId] });
    },
  });
}
