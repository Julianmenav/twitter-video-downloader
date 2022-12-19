import { useState } from "react";
import { useGetVideos } from "./hooks/useGetVideos";
import DataContainer from "./components/DataContainer";
import twitterIcon from "./assets/twitter.svg"
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const { data, loading, error } = useGetVideos({ url: inputValue });

  return (
    <div className="grid grid-cols-1 content-start min-h-screen justify-start gap-10 md:gap-14 bg-[#060606]">
      <h1 className="text-5xl font-bold text-center mt-24 md:mt-40 text-white">
        <span className="text-[#1DA1F2]">Twitter</span> <span>Video Downloader</span>
        <span className="inline-block ml-4 translate-y-1/4">
          <img src={twitterIcon} alt="Twitter Logo" className="w-14 h-14"/>
        </span>
      </h1>
      <form className="w-full text-center">
        <input
          placeholder="Coloca el enlace al tweet"
          className="p-0.5 text-center w-11/12  text-xs sm:max-w-lg sm:text-sm md:max-w-2xl md:text-base  pl-2 rounded-md bg-[#2F3336] focus:bg-neutral-900 text-neutral-50 placeholder-neutral-50  transition-colors duration-100"
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
        />
      </form>
      <DataContainer error={error} loading={loading} data={data} />
    </div>
  );
}

export default App;
