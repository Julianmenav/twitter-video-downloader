import React from "react";

const DataContainer = ({ loading, error, data }) => {
  return (
    <div>
      {loading ? (
          <div >
            <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
      ) : error ? (
        <h3>No se encuentra el vídeo</h3>
      ) : data ? (
        <ul>
          {data["variantsObj"].map((el, idx) => {
            return (
              <li className="m-3 p-2" key={idx}>
                <a className="border-2 p-2 rounded-md" href={el.url} target="_blank" rel="noreferrer">Opción {idx + 1}</a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default DataContainer;
