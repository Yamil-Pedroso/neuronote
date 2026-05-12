import { createFileRoute, redirect } from "@tanstack/react-router";

import { DashboardPage } from "../../pages/DashboardPage";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw redirect({
        to: "/login",
      });
    }
  },

  component: DashboardPage,
});
