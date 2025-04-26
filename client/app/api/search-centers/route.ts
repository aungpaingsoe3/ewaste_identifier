import { NextRequest, NextResponse } from 'next/server';

const GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const PLACES_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const address = searchParams.get("address");
  const type = searchParams.get("type") || "recycling";
  const radius = parseInt(searchParams.get("radius") || "5000", 10);
  const openNow = searchParams.get("openNow") === "true";
  const minRating = parseFloat(searchParams.get("minRating") || "0");

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    // Step 1: Geocode address -> lat/lng
    const geoRes = await fetch(`${GEOCODE_URL}?address=${encodeURIComponent(address)}&key=${apiKey}`);
    const geoData = await geoRes.json();

    if (geoData.status !== "OK") {
      return NextResponse.json({ error: "Failed to geocode address" }, { status: 400 });
    }

    const location = geoData.results?.[0]?.geometry?.location;
    if (!location) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    const { lat, lng } = location;

    // Step 2: Search nearby places
    let keyword = "electronics recycling disposal";
    if (type === "repair") {
      keyword = "electronics repair shop";
    }

    const url = new URL(PLACES_URL);
    url.searchParams.append("location", `${lat},${lng}`);
    url.searchParams.append("radius", radius.toString());
    url.searchParams.append("keyword", keyword);
    url.searchParams.append("key", apiKey);

    if (openNow) {
      url.searchParams.append("opennow", "true");
    }

    const placesRes = await fetch(url.toString());
    const placesData = await placesRes.json();

    if (placesData.status !== "OK") {
      return NextResponse.json({ error: "Failed to fetch nearby places" }, { status: 400 });
    }

    // Step 3: Map places and apply minRating filter
    let centers = placesData.results.map((place: any) => ({
      name: place.name,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      address: place.vicinity,
      rating: place.rating,
      opening_hours: place.opening_hours,
    }));

    if (minRating > 0) {
      centers = centers.filter((c: { rating?: number }) => (c.rating || 0) >= minRating);
    }

    return NextResponse.json({ lat, lng, centers });

  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
