import axios from "axios";
import { env } from "../../config/env.js";

export const automationService = {
  async emit(event: string, payload: unknown) {
    console.log("Automation event triggered:", {
      event,
      url: env.N8N_WEBHOOK_URL,
    });

    try {
      const response = await axios.post(env.N8N_WEBHOOK_URL, {
        event,
        payload,
        timestamp: new Date().toISOString(),
      });

      console.log("Automation event sent:", {
        event,
        status: response.status,
      });
    } catch (error) {
      console.error("Automation webhook error:", error);
    }
  },
};
