import { useCallback } from "react";

export default function useFetchCallback() {
  const callback = useCallback(async (endpoint, config = {}) => {
    try {
      const res = await fetch(`http://localhost:3000/api/${endpoint}`, config);
      const json = await res.json();

      if (!res.ok) {
        return {
          success: false,
          data: json.errors || ["Error desconocido"],
        };
      }

      return { success: true, data: json };
    } catch (err) {
      return { success: false, data: [err.message] };
    }
  }, []);

  return callback;
}
