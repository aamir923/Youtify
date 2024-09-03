const axios = require('axios');
const querystring = require('querystring');
const getAccessToken = require('./getAccessToken');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

async function searchTrack(query) {
    const accessToken = await getAccessToken(clientId, clientSecret);
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}&limit=1`; // Corrected query construction
    const headers = {
        'Authorization': 'Bearer ' + accessToken
    };
    
    try {
        const response = await axios.get(searchUrl, { headers });

        let trackIds = [];
        if (response.data.tracks && response.data.tracks.items) {
            trackIds = response.data.tracks.items.map(track => track.id);
        } else {
            throw new Error('Unexpected response structure');
        }
        return trackIds;
    } catch (error) {
        throw new Error('Error fetching track from Spotify: ' + error.message);
    }
}

module.exports = searchTrack;
