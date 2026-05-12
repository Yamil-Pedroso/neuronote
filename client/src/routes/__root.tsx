import { Outlet, createRootRoute } from "@tanstack/react-router";
//import { AuthProvider } from "@/context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "../layouts/MainLayout";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </QueryClientProvider>
  );
}
