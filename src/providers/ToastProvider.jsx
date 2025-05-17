import { toastService } from "@/utils/toastService";
import { useEffect, useState } from "react";
import { ToastContext } from "@/contexts/ToastContext";

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!message) {
      return;
    }

    const { type, text } = message;

    switch (type) {
      case "success":
        toastService.success(text);
        break;
      case "error":
        toastService.error(text);
        break;
      case "info":
        toastService.info(text);
        break;
      default:
        toastService.default(text);
        break;
    }

    setMessage(null);
  }, [message]);

  return <ToastContext.Provider value={{ setMessage }}>{children}</ToastContext.Provider>;
};
