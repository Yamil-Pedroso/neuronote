import { useMutation, useQueryClient } from "@tanstack/react-query";
import { aiService } from "../../services/ai.service";

export function useSummarizeNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: aiService.summarizeNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}

export function useGenerateTitle() {
  return useMutation({
    mutationFn: aiService.generateTitle,
  });
}

export function useSuggestTags() {
  return useMutation({
    mutationFn: aiService.suggestTags,
  });
}
