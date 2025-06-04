import papaparse from "papaparse";
import { useCallback } from "react";

export default function useParser() {
  const unparseCSV = useCallback((json) => {
    return new Promise((resolve, reject) => {
      const csv = papaparse.unparse(json, {
        header: true,
        skipEmptyLines: true,
        error: (err) => {
          reject(err);
        },
      });

      setTimeout(() => {
      resolve(csv);
      }, 1500);
    });
  }, []);

  return { unparseCSV };
}
