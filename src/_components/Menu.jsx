"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

function Menu() {
  const [ListNfts, setList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-api-key": "a5f803529351e301a184a240bffc5fad",
        },
      };

      try {
        const response = await fetch(
          "https://api.unleashnfts.com/api/v1/collections?currency=usd&metrics=assets&sort_by=marketcap&sort_order=desc&offset=0&limit=4&time_range=24h&include_washtrade=true",
          options
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response
        setList(data); // Save the fetched data
      } catch (err) {
        setError("Error fetching NFTs: " + err.message); // Handle errors
        console.error(err);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  return (
    <div className="fixed mx-5 flex flex-col h-screen">
      <ul key={1} className="menu bg-base-200 rounded-box w-56">
        <h1 className="text-xl text-black text-center p-2">Top NFTs</h1>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          ListNfts?.collections?.map((nfts, index) => (
            <li key={index}>
              <a>
                <Image
                  src={nfts.metadata.thumbnail_url}
                  width={30}
                  height={30}
                  alt="NFT Thumbnail"
                />
                {nfts.metadata.name}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Menu;
