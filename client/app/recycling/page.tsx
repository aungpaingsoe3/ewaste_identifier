"use client";

import { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

interface Center {
  name: string;
  lat: number;
  lng: number;
  address: string;
  rating?: number;
  opening_hours?: { open_now: boolean };
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
  const [searchType, setSearchType] = useState<"recycling" | "repair">("recycling");
  const [radius, setRadius] = useState<number>(5000);
  const [openNowOnly, setOpenNowOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortMethod, setSortMethod] = useState<"distance" | "rating">("distance");
  const [userLocation, setUserLocation] = useState<typeof defaultCenter>(defaultCenter);
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openInfoWindowIndex, setOpenInfoWindowIndex] = useState<number | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(12);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const radiusToZoom = (radius: number) => {
    if (radius <= 1000) return 17;
    if (radius <= 3000) return 15;
    if (radius <= 5000) return 13;
    if (radius <= 10000) return 12;
    return 11;
  };

  const handleSearch = async () => {
    if (!address.trim()) {
      setCenters([]);
      setError("Please enter an address or ZIP code.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        address,
        type: searchType,
        radius: radius.toString(),
        openNow: openNowOnly.toString(),
        minRating: minRating.toString(),
      });

      const res = await fetch(`/api/search-centers?${params}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Search failed");
      }

      setUserLocation({ lat: data.lat, lng: data.lng });
      setCenters(data.centers);
      const zoom = radiusToZoom(radius);
      setMapZoom(zoom);

      if (mapRef.current) {
        mapRef.current.panTo({ lat: data.lat, lng: data.lng });
        mapRef.current.setZoom(zoom);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerClick = (index: number) => {
    setOpenInfoWindowIndex(openInfoWindowIndex === index ? null : index);
  };

  useEffect(() => {
    if (address.trim()) {
      handleSearch();
    }
  }, [searchType, radius, openNowOnly, minRating]);

  const sortedCenters = [...centers].sort((a, b) => {
    if (sortMethod === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    }
    const distA = Math.hypot(a.lat - userLocation.lat, a.lng - userLocation.lng);
    const distB = Math.hypot(b.lat - userLocation.lat, b.lng - userLocation.lng);
    return distA - distB;
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Find Electronics Services</h1>

      {/* 🔥 Top Search Row (All Inline) */}
      <div className="flex flex-wrap gap-2">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as "recycling" | "repair")}
          className="border px-3 py-2 rounded min-w-[160px]"
        >
          <option value="recycling">Recycling Centers</option>
          <option value="repair">Repair Shops</option>
        </select>

        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address or ZIP code"
          className="border px-3 py-2 rounded flex-1 min-w-[200px]"
        />

        <select
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value, 10))}
          className="border px-3 py-2 rounded min-w-[120px]"
        >
          <option value={1000}>1 km</option>
          <option value={3000}>3 km</option>
          <option value={5000}>5 km</option>
          <option value={10000}>10 km</option>
          <option value={20000}>20 km</option>
        </select>

        <div className="flex items-center gap-2 min-w-[100px]">
          <input
            type="checkbox"
            checked={openNowOnly}
            onChange={() => setOpenNowOnly((prev) => !prev)}
          />
          <label>Open Now</label>
        </div>

        <select
          value={minRating}
          onChange={(e) => setMinRating(parseInt(e.target.value))}
          className="border px-3 py-2 rounded min-w-[140px]"
        >
          <option value={0}>Any Rating</option>
          <option value={3}>3+ Stars</option>
          <option value={4}>4+ Stars</option>
          <option value={5}>5 Stars Only</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded min-w-[120px]"
          disabled={loading || !address.trim()}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* 🗺️ Map */}
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={mapZoom}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          <Marker position={userLocation} label="You" />
          {centers.map((center, i) => (
            <div key={i}>
              <Marker
                position={{ lat: center.lat, lng: center.lng }}
                title={center.name}
                onClick={() => handleMarkerClick(i)}
              />
              {openInfoWindowIndex === i && (
                <InfoWindow
                  position={{ lat: center.lat, lng: center.lng }}
                  onCloseClick={() => setOpenInfoWindowIndex(null)}
                >
                  <div style={{ color: 'black' }}>
                    <h2 className="font-semibold">{center.name}</h2>
                    <p>{center.address}</p>
                    {center.rating && <p>⭐ {center.rating.toFixed(1)}</p>}
                  </div>
                </InfoWindow>
              )}
            </div>
          ))}
        </GoogleMap>
      )}

      {/* 🔥 Sort Controls */}
      <div className="flex gap-2 items-center">
        <label className="font-semibold">Sort by:</label>
        <select
          value={sortMethod}
          onChange={(e) => setSortMethod(e.target.value as "distance" | "rating")}
          className="border px-3 py-2 rounded"
        >
          <option value="distance">Closest</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* 📋 Results List */}
      {error && <p className="text-red-600">{error}</p>}

      {sortedCenters.length > 0 && (
        <ul className="space-y-2">
          {sortedCenters.map((center, i) => (
            <li key={i} className="border p-4 rounded">
              <strong>{center.name}</strong> {center.rating && `⭐ (${center.rating})`}
              <p>{center.address}</p>
            </li>
          ))}
        </ul>
      )}

      {!loading && sortedCenters.length === 0 && address.trim() && (
        <p className="text-gray-500">No centers found nearby.</p>
      )}
    </div>
  );
}
