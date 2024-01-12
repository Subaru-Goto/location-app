import { MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { fetchGeoData, fetchCountryData } from '../api/api';
import {useState, useEffect} from "react";

function Map() {
  const [geoData, setGeoData] = useState({});
  const [countryData, setCountryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try{
      const locationInfo = await fetchGeoData();
      const countryInfo = await fetchCountryData(locationInfo.country);
      setGeoData(locationInfo);
      setCountryData(countryInfo);
    } catch(error) {
      console.log(error.message);
    } finally{
      setIsLoading(false);
    }

  }

useEffect(() => {
  fetchData();
}, [])

// TO DO: calculate current time from timezone "utc+1"
const { region, city, lat, lng, timezone } = geoData;
const { name, flag } = countryData;
const location = [lat, lng]

  return (
    <>
    <h1 className="text-center p-5 text-5xl">Where am I?</h1>
    <div className="flex justify-center gap-5 p-10 text-lg">
      <h2>Country: {name.common}{flag}</h2>
      <h2>Region: {region}</h2>
      <h2>City: {city}</h2>
      <h2>Time Zone: {timezone}</h2>
    </div>
    {!isLoading ? <MapContainer center={location} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
           :<h2>Loading...</h2>}
    </>
  )
}

export default Map