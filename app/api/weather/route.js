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