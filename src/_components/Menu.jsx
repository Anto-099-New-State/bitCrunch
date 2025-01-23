"use client"
import React, { useState } from 'react'
import Image from 'next/image';

function Menu() {
    const [ListNfts,setList]=useState();
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-api-key': 'a5f803529351e301a184a240bffc5fad'}
          };
          
          fetch('https://api.unleashnfts.com/api/v1/collections?currency=usd&metrics=assets&sort_by=marketcap&sort_order=desc&offset=0&limit=4&time_range=24h&include_washtrade=true', options)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
          })
          .then(data => {
            setList(data); // Save the fetched data
            console.log(data); // Access the first NFT's name
          })
          .catch(err => console.error("Error fetching NFTs:", err));
  return (
    <div className='fixed mx-5 flex flex-col h-screen'> 
        <ul className="menu bg-base-200 rounded-box w-56">
        <h1 className='text-xl text-black text-center p-2'>Top-NFTs</h1>
        {ListNfts?.collections?.map((nfts,index)=>(


  <li>
    <a>
      <Image src={nfts.metadata.thumbnail_url}  width={30} height={30} />
      {nfts.metadata.name}
    </a>
  </li>

        ))};
        </ul>
</div>
  )
}

export default Menu