from flask import Flask, render_template, request
import requests
import os

app = Flask(__name__)

GOOGLE_PLACES_API_KEY = "API_KEY_HERE"
GOOGLE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json"
GOOGLE_PLACES_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

def get_coordinates(address):
    params = {"address": address, "key": GOOGLE_PLACES_API_KEY}
    response = requests.get(GOOGLE_GEOCODE_URL, params=params)
    data = response.json()
    if data.get("results"):
        location = data["results"][0]["geometry"]["location"]
        return location["lat"], location["lng"]
    return None, None

def get_recycling_centers(lat, lon):
    params = {
        "location": f"{lat},{lon}",
        "radius": 5000,
        "keyword": "electronics recycling disposal",
        "key": GOOGLE_PLACES_API_KEY
    }
    response = requests.get(GOOGLE_PLACES_URL, params=params)
    data = response.json()
    centers = [
        {
            "lat": place["geometry"]["location"]["lat"],
            "lon": place["geometry"]["location"]["lng"],
            "name": place.get("name", "Recycling Center"),
            "address": place.get("vicinity", "Unknown Address")
        }
        for place in data.get("results", [])
    ]
    return centers

@app.route('/', methods=['GET', 'POST'])
def index():
    user_lat, user_lon = 37.7749, -122.4194  # Default to San Francisco
    centers = []
    if request.method == 'POST':
        address = request.form.get("address")
        lat, lon = get_coordinates(address)
        if lat and lon:
            user_lat, user_lon = lat, lon
            centers = get_recycling_centers(user_lat, user_lon)
    return render_template('index.html', google_api_key=GOOGLE_PLACES_API_KEY, centers=centers, user_lat=user_lat, user_lon=user_lon)

if __name__ == '__main__':
    app.run(debug=True)
