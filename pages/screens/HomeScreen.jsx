import React, { useState } from "react";
import axios from "axios";

const HomeScreen = () => {
  //   const [city, setCity] = useState("");
  const [ip, setIp] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const header = {
    "X-Api-Key": "X4e3pjUrUbjg1QqWzGIeTw==o21cSWFtdu6hy3vi",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(ip);
    setisLoading(true);

    // Perform validation
    if (!ip.trim()) {
      setError("ip is required.");
      setisLoading(false);
      return;
    }

    // You can now send the data to the API here
    axios
      .get(`https://api.api-ninjas.com/v1/celebrity?name=${ip}`, {
        headers: header,
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data) {
        //   console.log(response.data.city);
          setData(response.data);
          setError("");
        } else {
          setError("Please enter a valid ip.");
        }
      })
      .catch((err) => {
        setError(
          "An error occurred while fetching data. Please try again later."
        );
      })
      .finally(() => {
        setisLoading(false);
      });

    // Reset the form
    setIp("");
  };

  return (
    <div className="flex overflow-y-auto flex-col justify-center min-h-screen items-center bg-gray-100">
      <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="city"
          >
            Celebrity
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            placeholder="Enter Celebrity name"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    
      {data &&
        data.map((item,ind) => (
          <div key={ind} className="bg-white m-2 border-2 border-gray-500 shadow-md rounded-lg max-w-sm p-8 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
            {/* <div className="text-lg font-bold mb-4">Data Details</div> */}
            <div className="grid grid-cols-1 gap-4">
            <h1 className="text-3xl font-bold font-serif text-black">{item?.name}</h1>
              <div>
                <div className="text-gray-700">Age:</div>
                <div className="font-bold text-black">{item?.age || 'not available'}</div>
              </div>
              <div>
                <div className="text-gray-700">Birthday:</div>
                <div className="font-bold text-black">{item?.birthday || 'not available'}</div>
              </div>
              <div>
                <div className="text-gray-700">Gender:</div>
                <div className="font-bold text-black">{item?.gender || 'not available'}</div>
              </div>
              <div>
                <div className="text-gray-700">Height:</div>
                <div className="font-bold text-black">{item?.height || 'not available'} metres</div>
              </div>
              <div>
                <div className="text-gray-700">Is Alive:</div>
                <div className="font-bold text-black">
                  {item?.is_alive?.toString() || 'not available'}
                </div>
              </div>
              <div>
                <div className="text-gray-700">name:</div>
                <div className="font-bold text-black">{item?.name || 'not available'}</div>
              </div>
              <div>
                <div className="text-gray-700">nationality:</div>
                <div className="font-bold text-black">{item?.nationality || 'not available'}</div>
              </div>
              <div>
                <div className="text-gray-700">net_worth:</div>
                <div className="font-bold text-black">${item?.net_worth || 'not available'}</div>
              </div>
                    <div className="text-gray-700">Occupation:</div>
              {item?.occupation &&
                item?.occupation?.map((o,index) => (
                  <div className="flex max-w-sm" key={index}>
                    <h1 className="font-bold inline-block text-black">{o || 'not available'}, </h1>
                  </div>
                ))}
            </div>
          </div>
        ))}
      {data == null && (
        <div className="bg-white shadow-md rounded-lg p-8 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
          <div>
            <div className="text-gray-700">Please enter a valid name</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
