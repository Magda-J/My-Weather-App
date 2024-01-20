import { NextResponse } from "next/server";
import axios from "axios";

export const dynamic = 'force-dynamic';
export async function GET() {
    try {
        const weatherAPIKey = process.env.WEATHER_KEY;

        

        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=51.508&lon=-0.126&appid=${weatherAPIKey}&units=metric`);

        return NextResponse.json({
            body: weather.data,
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.error("Internal Server Error");
    }
}



// export async function GET(userInput) {
//     const APIKEY = "63c61b0d757c73aaf542a88a2d209c56"; // process.env.OPENWEATHER_API_KEY;

//     try {
//         const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${APIKEY}`);
//         const data = response.data[0] ? response.data[0] : null;
        
//         if (!data) {
//             return NextResponse.error();
//         }

//         const lat = data.lat;
//         const lon = data.lon;

//         try {
//             const weatherResponse = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${APIKEY}&units=metric`);
            
//             return weatherResponse;
//         } catch (error) {
//             console.error(error);
//             return NextResponse.error();
//         }
//     } catch (error) {
//         console.error(error);
//         return NextResponse.error();
//     }
// }