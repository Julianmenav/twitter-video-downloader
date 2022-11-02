import { useState } from "react";
import { useGetVideos } from "./hooks/useGetVideos";
import DataContainer from "./components/DataContainer";
import "./App.css";




function App() {
  const [inputValue, setInputValue] = useState("");
  const {data, loading, error} = useGetVideos({url: inputValue});
  

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h1 className="text-3xl font-bold text-center">
        Twitter Video Downloader
      </h1>
      <form>
        <input
          className="border-2 w-96 h-10"
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
        />
      </form>
      <DataContainer error={error} loading={loading} data={data} />
    </div>
  );
}

export default App;
