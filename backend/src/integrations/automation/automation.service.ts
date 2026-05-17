import axios from "axios";

export const automationService = {
  async emit(event: string, payload: unknown) {
    try {
      await axios.post(process.env.N8N_WEBHOOK_URL!, {
        event,
        payload,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Automation webhook error:", error);
    }
  },
};
