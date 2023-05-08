import { useMemo } from "react";
import React from 'react'
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Button } from "@/components/button";
import { Separator } from "../separator";

const Hero = () =>{

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCrQ-Vnu81we2fzuaT5JaDa0DJaWCqhZ2M',
      });
      
      if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}
function Map() {
    const center = useMemo(() => ({ lat: 30.0444, lng: 31.2357 }), []);
    
  
    return (
        <div className="w-screen mx-[calc((100vw-100%)/-2+8px)]">
      <GoogleMap zoom={10} center={center} mapContainerClassName="map-container" mapContainerStyle={{width: '100vw', height: '70vh'}} options={{mapId: 'f4ea8646fab19d23'}}>
        <Marker position={center} />
      </GoogleMap>
      <div className="flex lg:flex-row md:flex-row justify-between flex-col items-center border border-neutral-300 rounded-lg shadow-xl bg-white px-9 py-7 absolute mx-20 inset-x-px top-574">
        <div>
            <label className="text-base font-medium text-base-black block">From</label>
            <input placeholder="Departure" className="font-normal text-sm leading-5 text-neutral-500" />
        </div>
        <Separator vertical className="w-[1px] h-10 bg-neutral-200" />
        <div>
            <label className="text-base font-medium text-base-black block">To</label>
            <input placeholder="Destination" className="font-normal text-sm leading-5 text-neutral-500" />
        </div>
        <Separator vertical className="w-[1px] h-10 bg-neutral-200" />
        <div>
            <label className="text-base font-medium text-base-black block">Travel Time</label>
            <input placeholder="20 March at 14:06" className="font-normal text-sm leading-5 text-neutral-500" />
        </div>
        <Separator vertical className="w-[1px] h-10 bg-neutral-200" />
        <div>
            <label className="text-base font-medium text-base-black block">Passengers</label>
            <input placeholder="1 Adult" className="font-normal text-sm leading-5 text-neutral-500" />
        </div>
        <div>
            <Button size={'lg'} variant={'primary'}>Find a Ride</Button>
        </div>
      </div>
      </div>
    );
}
export default Hero