# E-Waste Identifier by F4 (Group 4)
## Group Members: Aung Paing Soe, Kyaw Soe Han, Trong Le, William Ngo

### Project Description

### How to Run the Web Application

## 🚀 Setup Instructions

Follow the steps below to get the project up and running on your local machine.

1. Clone the Repository

git clone https://github.com/aungpaingsoe3/ewaste_identifier.git
cd ewaste_identifier

2. Set Environment Variables

Create a .env.local file inside the client folder and add the following environment variables:

GOOGLE_MAPS_API_KEY=<insert-valid-api-key-here>
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<insert-prev-api-key-here>
NEXT_PUBLIC_GEMINI_API_KEY=<insert-valid-gemini-key-here>

💡 Replace the placeholders with your actual API keys.

3. Install Dependencies

Install the required packages by running:

npm install

This will install dependencies such as:

- @react-google-maps/api
- react-markdown
- @google/genai

4. Build the Project

Generate an optimized production build:

npm run build

5. Start the Application

Run the app locally for testing:

npm start

✅ You’re all set! Explore the app and help promote responsible e-waste recycling.
