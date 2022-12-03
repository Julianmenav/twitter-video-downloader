import { useEffect, useReducer } from "react";
import parseURL from "../utils/parseURL";
import { reducer } from "./getVideosReducer";

const apiURL = import.meta.env.VITE_API_URL;

const initialState = {
  loading: false,
  error: false,
  data: null,
};

export const useGetVideos = ({ url }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (url === "") return;
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const tweet = parseURL(url);
        if (!tweet.isValid) return;

        const tweetId = tweet.id;
        const response = await fetch(`${apiURL}/api/${tweetId}`, {
          //If abortController is canceled because input changes, fetch is never done.
          signal: abortController.signal,
        });
        const data = await response.json();
        
        if (response.ok) {
          dispatch({ type: "success", data: data });
        } else {
          dispatch({ type: "fail" });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: "fail" });
      }
    };
    
    //Loading svg
    dispatch({ type: "start" });
    //Wait 0.5s to call API.
    setTimeout(fetchData, 500);

    return () => {
      //In every input change, cancel all pending api calls.
      abortController.abort();
    };
  }, [url]);

  return state;
};
