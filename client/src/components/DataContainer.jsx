import React from "react";

const DataContainer = ({ loading, error, data }) => {
  return (
    <div className="text-neutral-50">
      {loading ? (
          <div >
            <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
      ) : error ? (
        <h3>No se encuentra el vídeo</h3>
      ) : data ? (

        <div className="flex flex-row">
          {/* <img src={data["thumbNail"]} className="max-w-sm max-h-64 shadow-md border-2 border-gray-200"/> */}
          <video className="max-w-sm max-h-64 shadow-md border-2 border-gray-200" src={data["variantsObj"][0]["url"]} autoPlay muted loop/>
          <div className="bg-neutral-600 p-2 rounded-md w-full">
            <ul className="p10 mt-5 ">
              {data["variantsObj"].map((el, idx) => {
                return (
                  <li className="m-3 p-2 pl-0" key={idx}>
                    <button className="border-2 p-2 rounded-md text-black bg-neutral-50 hover:bg-neutral-200 active:translate-y-0.5">
                      <a  href={el.url} target="_blank" rel="noreferrer">Opción {idx + 1}</a>
                    </button>
                    <span className="text-neutral-50 p-4 text-sm"> Resolución: {el.size}</span>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>
      ) : null}
    </div>
  );
};

export default DataContainer;
