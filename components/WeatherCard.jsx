const WeatherCard = ({ icon, location, temp, description, temp_min, temp_max, wind_speed, timezone2 }) => {

  const getFormattedDate = (timestamp) => {
    console.log("Timestamp from API:", timestamp); // Log the timestamp to the console
  
    const date = new Date(timestamp * 1000); // Convert the timestamp to milliseconds
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="card  w-10/12 bg-gradient-to-b from-cyan-50 to-blue-100  shadow-xl mx-auto mt-3 gap-y-20">
      <div className="card-body flex flex-col items-center justify-center">
        <h2 className="card-title text-2xl md:text-4xl text-center">{location}</h2>
        <h2 className="card-date font-bold text-center">{getFormattedDate(timezone2)}</h2>
        <div className="flex items-center justify-center mb-4">
          {icon && (
            <img
              src={`https://openweathermap.org/img/w/${icon}.png`}
              alt="Weather Icon"
              className="w-20 h-auto mr-2"
            />
          )}
          <p className="font-bold text-2xl text-center ">{temp}°C</p>
          
        </div>
        <div className="flex flex-col mb-10">
          <div className="grid grid-cols-2 gap-12 md:gap-x-36">
            <div>
              <p className="whitespace-normal text-md text-center font-bold text-sm md:text-base">Weather Forecast:</p>
              <p className="whitespace-normal text-center md:text-2xl ">{description}</p>
            </div>
            <div>
              <p className="whitespace-normal text-center font-bold text-sm md:text-base">Wind Speed:</p>
              <p className="whitespace-normal text-center md:text-2xl ">{wind_speed} m/s</p>
            </div>
            <div>
              <p className="	text-wrap: wrap whitespace-normal text-center font-bold text-sm md:text-base">Max Temperature:</p>
              <p className="whitespace-normal text-center md:text-2xl ">{temp_max}°C</p>
            </div>
            <div>
              <p className="whitespace-normal text-center font-bold text-sm md:text-base">Min Temperature:</p>
              <p className="whitespace-normal text-center md:text-2xl">{temp_min}°C</p>

            </div>
          </div>
        </div>
        <div>
        <p className="	text-wrap: wrap text-center text-xs md:text-sm">Created by Aaron, Andy and Magdalena </p>
        <p className="	text-wrap: wrap text-center text-xs md:text-sm">Dedicated to Erin </p>

        <p className="text-center text-xs">Thanks to:  <a href="https://openweathermap.org/" className="mx-auto hover:text-blue-500 text-xs">https://openweathermap.org/</a></p>
       
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
