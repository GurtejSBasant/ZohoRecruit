// utils/tokenUtils.js
const axios = require('axios');
const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_ACCOUNTS_URL } = require('../config/zohocreds.js');
    
let ZOHO_ACCESS_TOKEN = '';

async function refreshAccessToken() {
    try {
        const response = await axios.post(ZOHO_ACCOUNTS_URL, null, {
            params: {
                refresh_token: ZOHO_REFRESH_TOKEN,
                client_id: ZOHO_CLIENT_ID,
                client_secret: ZOHO_CLIENT_SECRET,
                grant_type: 'refresh_token'
            }
        });
        ZOHO_ACCESS_TOKEN = response.data.access_token;
        console.log('Access token refreshed successfully', ZOHO_ACCESS_TOKEN);
    } catch (error) {
        console.error('Error refreshing access token:', error.response?.data || error.message);
        throw error;
    }
}

function getAccessToken() {
    return ZOHO_ACCESS_TOKEN;
}

module.exports = { refreshAccessToken, getAccessToken };
