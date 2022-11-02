import { useState } from "react";
import { useGetVideos } from "./hooks/useGetVideos";
import DataContainer from "./components/DataContainer";
import "./App.css";




function App() {
  const [inputValue, setInputValue] = useState("");
  const {data, loading, error} = useGetVideos({url: inputValue});
  

  return (
    <div className="flex flex-col items-center h-screen justify-start gap-14 bg-neutral-800">
      <h1 className="text-5xl font-bold text-center mt-24 text-neutral-200">
        Twitter Video Downloader
      </h1>
      <form>
        <input
          placeholder="Coloca el enlace al tweet"
          className="border-2 w-96 h-10 pl-2 bg-neutral-500 text-neutral-50 placeholder-neutral-50"
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
        />
      </form>
      <DataContainer error={error} loading={loading} data={data} />
    </div>
  );
}

export default App;
