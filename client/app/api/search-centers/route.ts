import { NextRequest, NextResponse } from 'next/server'

const GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json"
const PLACES_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get("address")
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!address) return NextResponse.json({ error: "Missing address" }, { status: 400 })

  try {
    const geoRes = await fetch(`${GEOCODE_URL}?address=${encodeURIComponent(address)}&key=${apiKey}`)
    const geoData = await geoRes.json()
    const location = geoData.results?.[0]?.geometry?.location
    if (!location) return NextResponse.json({ error: "Location not found" }, { status: 404 })

    const { lat, lng } = location

    const placesRes = await fetch(
      `${PLACES_URL}?location=${lat},${lng}&radius=5000&keyword=electronics recycling disposal&key=${apiKey}`
    )
    const placesData = await placesRes.json()

    const centers = placesData.results.map((place: any) => ({
      name: place.name,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      address: place.vicinity,
    }))

    return NextResponse.json({ lat, lng, centers })
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}