import { useEffect, useState } from "react";
import parseURL from './utils/parseURL'
import "./App.css";
import DataContainer from "./components/DataContainer";

const apiURL = import.meta.env.VITE_API_URL;


function App() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    if(inputValue === "") return;
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const tweetId = parseURL(inputValue);
        
        const isNum = (str) => /^[0-9]*$/.test(str)
        if (!isNum(tweetId)) return;
        
        setLoading(true);
        const response = await fetch(`${apiURL}/api/${tweetId}`, { signal: abortController.signal })
        const data = await response.json();
        setData(data);
    
      } catch (error) {
        setError(true);
        console.error(error);
      }

      setLoading(false);
    }

    fetchData();

    return () => {
      abortController.abort();
    }
  }, [inputValue]);
  

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h1 className="text-3xl font-bold text-center">
        Twitter Video Downloader
      </h1>
      <form>
        <input
          className="border-2"
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
        />
      </form>
      <DataContainer error={error} loading={loading} data={data} />
    </div>
  );
}

export default App;
