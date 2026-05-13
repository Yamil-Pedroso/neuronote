import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      closeButton
      toastOptions={{
        unstyled: true,

        classNames: {
          toast:
            "flex items-center gap-3 rounded-[1.7rem] border-4 border-[#1F1F1F] p-4 text-[#1F1F1F]",

          title: "text-sm font-black",

          description: "text-xs font-bold opacity-80",

          closeButton:
            "rounded-full border-4 border-[#1F1F1F] bg-white text-[#1F1F1F]",

          success: "bg-[#A8D5BA] shadow-[6px_6px_0_#7DBA95]",

          error: "bg-[#F3A8A8] shadow-[6px_6px_0_#E48D8D]",

          warning: "bg-[#F4EBDD] shadow-[6px_6px_0_#D9C7A8]",

          info: "bg-[#FFF9EF] shadow-[6px_6px_0_#A8D5BA]",
        },
      }}
    />
  );
}
