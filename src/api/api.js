export const fetchGeoData = async() => {
  const url = `
    https://geo.ipify.org/api/v2/country,city?
    apiKey=${import.meta.env.VITE_GEO_LOCATION_API_KEY}`
  try{
    const response = await fetch(url);
    if(!response.ok) {
      console.log("Fecthing failed");
    }
    const data = await response.json();
    return data.location;
  } catch(error) {
    throw new Error(error.message);
  }
}

export const fetchCountryData = async(country) => {
  const url = `https://restcountries.com/v3.1/alpha/${country}`
  try{
    const response = await fetch(url);
    if(!response.ok) {
      console.log("Fecthing failed");
    }
    const data = await response.json();
    return data[0];
  } catch(error) {
    throw new Error(error.message);
  }
}