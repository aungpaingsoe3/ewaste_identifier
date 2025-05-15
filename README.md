# E-Waste Identifier by F4 (Group 4)
## Group Members: Aung Paing Soe, Kyaw Soe Han, Trong Le, William Ngo

<ins>**NOTE:**</ins> The documentation files, such as the Description/Requirements document and the Architectural Diagrams document, can be found inside the ```documentation``` folder. The Presentation Slide Deck can also be found in the same folder. The Demo Video is embedded within the presentation slide deck.  

## Project Description

This web app helps users manage their electronic devices and reduce e-waste by offering repair, recycling, and troubleshooting solutions for users' devices.

## **Features**
- **Troubleshooting:** Get support by entering the device name and issue.
- **Repair Guides:** Access iFixIt guides and nearby repair shops.
- **Sustainable Disposal:** Find local recycling centers and trade-in options.
- **Easy-to-use User Interface**: Provide device suggestions for interactive, easy-to-use, and easy-to-navigate user interface

## **Impact**
By promoting repairs, reuse, and proper recycling, the app helps users save money and bring awareness about e-waste pollution, ultimately attempting to reduce e-waste pollution.


## How to Start the Web Application

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

**Replace the placeholders with your actual API keys.**

3. Install Dependencies

Install the required packages by running:

```bash
npm install
```

This will install dependencies such as:

- ```@react-google-maps/api```
- ```react-markdown```
- ```@google/genai```

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

You’re all set! Explore the app and help promote responsible e-waste recycling.

## How to Use the Web Application

1. Enter your device name, and as you enter, you will see a suggestion box pop up. Select your device from the suggested devices list.

2. Enter your issue and click the ```Submit``` button.

3. After waiting, you will see a panel for the troubleshooting guide.

4. At the end of that page, you will see two choices: Repair Guide & Local Repair Shops and Recycling Centers Locator.

5. Clicking the Repair Guide button will lead to a new tab that shows all available iFixit repair guides for your device. You may choose a repair guide that best fits your needs.

6. Clicking the Local Repair Shops and Recycling Centers Locator will lead to a maps page that allow you to enter your location information and search criteria.

7. If you select repair shops, you will be presented with a list of repair shops near the location perimeter that you selected.

8. If you select recycling centers, you will be presented with a list of recycling centers near the location perimeter that you selected.

9. You can sort these results by proximity or by highest rated.

10. You can go back to the home page of the platform by going back using the back button from the browser or clicking the ```Try Another Device``` button from the troubleshooting guide page.
