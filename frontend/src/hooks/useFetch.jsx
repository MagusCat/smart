import { useState, useEffect } from "react";

export default function useFetch(endpoint, body, auto = true) {
  const [data, setData] = useState([]);
  const [state, setState] = useState("idle");

  const fetchData = async () => {
    try {
      setState("loading");
      const res = await fetch(
        `http://localhost:3000/api/${endpoint}`,
        body ?? {}
      );
      const json = await res.json();

      if (!json) throw new Error("No data");

      if (res.status !== 200) {
        throw new Error(json.message || "Error fetching data");
      }

      setData(json);
      setState("done");
    } catch (err) {
      setData([]);
      setState("error");
    }
  };

  useEffect(() => {
    if (auto) fetchData();
  }, [body, auto]);

  return { data, state, refetch: fetchData};
}
