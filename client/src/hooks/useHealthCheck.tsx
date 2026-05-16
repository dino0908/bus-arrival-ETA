import { useState, useEffect } from "react";
import axios from "axios";

export const useHealthCheck = (intervalMs: number = 30000) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const [isLive, setIsLive] = useState<boolean>(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/health`);
        if (response.status === 200) {
          setIsLive(true);
        } else {
          setIsLive(false);
        }
      } catch (error) {
        setIsLive(false);
      }
    };

    checkHealth();

    const timerId = setInterval(checkHealth, intervalMs);

    return () => clearInterval(timerId);
  }, [intervalMs]);

  return isLive;
};
