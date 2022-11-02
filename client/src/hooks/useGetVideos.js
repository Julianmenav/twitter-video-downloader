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

        dispatch({ type: "start" });

        const tweetId = tweet.id;
        const response = await fetch(`${apiURL}/api/${tweetId}`, {
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

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return state;
};
