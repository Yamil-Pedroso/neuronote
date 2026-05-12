import { useMutation } from "@tanstack/react-query";

import { searchService } from "../../services/search.service";

export function useSemanticSearch() {
  return useMutation({
    mutationFn: searchService.semanticSearch,
  });
}
