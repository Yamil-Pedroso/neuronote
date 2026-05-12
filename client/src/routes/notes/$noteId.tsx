import { createFileRoute } from "@tanstack/react-router";

import { NoteDetailsPage } from "../../pages/NoteDetailsPage";

export const Route = createFileRoute("/notes/$noteId")({
  component: NoteDetailsPage,
});
