import { useState, useEffect } from "react";

export default function useFetchOlap(body) {
  const [data, setData] = useState([]);
  const [state, setState] = useState("loading");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState("loading");
        const res = await fetch("http://localhost:3000/api/olap/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await res.json();

        if (!json) throw new Error("No data");
        
        if( res.status !== 200 || json.status === "error") {
          throw new Error(json.message || "Error fetching data");
        }
        
        setData(json.data);
        setState("done");
      } catch (err) {
        console.log(err);
        setData([]);
        setState("error");
      }
    };
    fetchData();
  }, [body]);

  return { data, state };
}
