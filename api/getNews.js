const axios = require('axios');  // Use require instead of import

export default async function handler(req, res) {
  try {
    const apiKey = 'ed97c7d8a0af0d9954cbe163c5e5eebc'; // your API key
    const apiUrl = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`;

    // Fetch the data from the Currents API
    const response = await axios.get(apiUrl);

    // Send the response data back to the frontend
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
