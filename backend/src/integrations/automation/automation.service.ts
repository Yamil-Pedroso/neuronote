import axios from "axios";
import { env } from "../../config/env.js";

export const automationService = {
  async emit(event: string, payload: unknown) {
    try {
      await axios.post(env.N8N_WEBHOOK_URL, {
        event,
        payload,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Automation webhook error:", error);
    }
  },
};
