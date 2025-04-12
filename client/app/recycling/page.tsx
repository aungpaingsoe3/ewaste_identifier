"use client";

import { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

// Type definitions for clarity
interface Center {
  name: string;
  lat: number;
  lng: number;
  address: string;
}

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

export default function RecyclingPage() {
  const [address, setAddress] = useState<string>("");
  const [userLocation, setUserLocation] = useState<typeof defaultCenter>(defaultCenter);
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const handleSearch = async () => {
    if (!address) {
      setError("Please enter an address or ZIP code.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/search-centers?address=${encodeURIComponent(address)}`);
      const data = await res.json();

      console.log("API Response Data:", data);

      if (!res.ok) {
        throw new Error(data.error || "Search failed");
      }

      setUserLocation({ lat: data.lat, lng: data.lng });
      setCenters(data.centers);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Use openInfoWindowIndex to track which marker's InfoWindow is open
  const [openInfoWindowIndex, setOpenInfoWindowIndex] = useState<number | null>(null);

  const handleMarkerClick = (index: number) => {
    // Toggle the InfoWindow visibility based on index
    setOpenInfoWindowIndex(openInfoWindowIndex === index ? null : index);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Find Electronics Recycling Centers</h1>
      <div className="flex gap-2">
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address or ZIP code"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={userLocation} zoom={13}>
          <Marker position={userLocation} label="You" />

          {centers.length > 0 ? (
            centers.map((center, i) => (
              <Marker
                key={i}
                position={{ lat: center.lat, lng: center.lng }}
                title={center.name}
                onClick={() => handleMarkerClick(i)} // Handle marker click
              />
            ))
          ) : null}

          {centers.map((center, i) => (
            openInfoWindowIndex === i && (
              <InfoWindow
                key={i}
                position={{ lat: center.lat, lng: center.lng }}
                onCloseClick={() => setOpenInfoWindowIndex(null)} // Close InfoWindow on close
              >
                <div style={{ color: 'black' }}> 
                  <h2 className="font-semibold">{center.name}</h2>
                  <p>{center.address}</p>
                </div>
              </InfoWindow>
            )
          ))}
        </GoogleMap>
      )}

      {centers.length > 0 && (
        <ul className="space-y-2">
          {centers.map((center, i) => (
            <li key={i} className="border p-4 rounded">
              <strong>{center.name}</strong>
              <p>{center.address}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
