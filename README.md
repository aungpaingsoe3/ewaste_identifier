# E-Waste Identifier by F4 (Group 4)
## Group Members: Aung Paing Soe, Kyaw Soe Han, Trong Le, William Ngo

### Project Description

  This project provides a software web application solution to help you manage your electronic devices better. Many people replace devices that either break or no longer fit their needs. Often, these old devices are not disposed of correctly. This leads to those old devices lying around in their homes, which leads to e-waste pollution. Our platform offers solutions to those problems. After inputting the device name and its issue, it helps you troubleshoot the issue and provides a website where you can find repair guides through iFixIt. We also connect you with the local repair shops and suggest recycling or trade-in programs. If you need a new device, we offer personalized recommendations. This app aims to save you money and reduce electronic waste.
	Ultimately, this project aims to address the problem of e-waste pollution by allowing users to be aware of e-waste pollution and practice e-waste recycling by providing local recycling centers so that old electronic devices can be recycled effectively, rather than leaving the old device around.



### How to Run the Web Application

## 🚀 Setup Instructions

Follow the steps below to get the project up and running on your local machine.

1. Clone the Repository

```bash
git clone https://github.com/aungpaingsoe3/ewaste_identifier.git
cd ewaste_identifier/client
```

2. Set Environment Variables

Create a .env.local file inside the client folder and add the following environment variables:

```.env.local
GOOGLE_MAPS_API_KEY=<insert-valid-api-key-here>
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<insert-prev-api-key-here>
NEXT_PUBLIC_GEMINI_API_KEY=<insert-valid-gemini-key-here>
```

💡 Replace the placeholders with your actual API keys.

3. Install Dependencies

Install the required packages by running:

```bash
npm install
```

This will install dependencies such as:

- @react-google-maps/api
- react-markdown
- @google/genai

4. Build the Project

Generate an optimized production build:

```bash
npm run build
```

5. Start the Application

Run the app locally for testing:

```bash
npm start
```

✅ You’re all set! Explore the app and help promote responsible e-waste recycling.
