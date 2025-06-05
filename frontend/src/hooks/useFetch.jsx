import { useState, useEffect } from "react";

export default function useFetch(endpoint, default_body = null, auto = true) {
  const [data, setData] = useState([]);
  const [state, setState] = useState("idle");

  const fetchData = async (body = {}) => {
    if (!endpoint) {
      setData([]);
      setState("idle");
      return;
    }

    try {
      setState("loading");
      const res = await fetch(
        `http://localhost:3000/api/${endpoint}`,
        { ...(default_body ?? {}), ...(body ?? {})}
      );

      const json = await res.json();

      if (!json) throw new Error("No data");

      if(res.status > 200) {
        setData(json);
        setState("error");
        return;
      };

      setData(json);
      setState("done");
    } catch (err) {
      setData([]);
      setState("error");
    }
  };

  useEffect(() => {
    if (auto) fetchData();
  }, [endpoint, default_body, auto]);

  return { data, state, refetch: fetchData };
}
