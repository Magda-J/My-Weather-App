import axios from "axios";

export class ApiClient {

responseStatusCheck(responseObject) {
    if (responseObject.status >= 200 && responseObject.status < 300) {
      return Promise.resolve(responseObject);
    } else {
      return Promise.reject(new Error(responseObject.statusText));
    }
  }

  getRequest(url) {
    return axios
      .get(url)
      .then(
        this.responseStatusCheck
      )
      .catch(() => {
        console.error(err);
      });
  }

  // this gets a weather details

  getWeather() {
    // const weatherAPIKey = process.env.NEXT_PUBLIC_WEATHER_KEY;
    
    // const weatherAPIURL = `https://api.openweathermap.org/data/3.0/onecall?lat=51.508&lon=-0.126&appid=${weatherAPIKey}&units=metric`;

    return this.getRequest("/api/weather");
}
}
//  "/api/weather