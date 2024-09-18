// utils/zohoUtils.js
const axios = require('axios');
const { ZOHO_RECRUIT_API_URL } = require('../config/zohocreds');
const { refreshAccessToken, getAccessToken } = require('./tokenutils');

async function makeZohoRequest(endpoint) {
    if (!getAccessToken()) {
        await refreshAccessToken();
    }

    const headers = {
        'Authorization': `Zoho-oauthtoken ${getAccessToken()}`,
        'Content-Type': 'application/json'
    };

    try {
        console.log("baseurl:",ZOHO_RECRUIT_API_URL)
        console.log("endpoint:",endpoint)
        const response = await axios.get(`${ZOHO_RECRUIT_API_URL}/${endpoint}`, { headers });
        console.log("print",response)
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            await refreshAccessToken();
            headers.Authorization = `Zoho-oauthtoken ${getAccessToken()}`;
            const retryResponse = await axios.get(`${ZOHO_RECRUIT_API_URL}/${endpoint}`, { headers });
            return retryResponse;
        }
        throw error;
    }
}


function buildJobData(jobData) {
    const today = new Date();
    const oneMonthLater = new Date(today.setMonth(today.getMonth() + 1));
    const formattedDate = oneMonthLater.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const mandatoryFields = {
        Job_Opening_Name: jobData.Job_Opening_Name || jobData.Posting_Title || 'New Job Opening',
        Posting_Title: jobData.Posting_Title || jobData.Job_Opening_Name || 'New Job Opening',
        Job_Description: jobData.Job_Description || 'No description provided',
        Job_Opening_Status: jobData.Job_Opening_Status || 'In-Progress',
        Number_of_Positions: jobData.Number_of_Positions || 1,
        Currency: jobData.Currency || 'USD',
        Job_Type: jobData.Job_Type || 'Full Time',
        Target_Date: jobData.Target_Date || formattedDate,
        Date_Opened: jobData.Date_Opened || new Date().toISOString().split('T')[0],
        Territory: jobData.Territory || 'Default Territory', // Add a default Territory
        Hiring_Manager: jobData.Hiring_Manager || 'Default Manager', // Add a default Hiring Manager
        Department: jobData.Department || 'Default Department', // Add a default Department
    };

    return {
        data: [{
            ...mandatoryFields,
            ...jobData
        }]
    };
}

async function jobpostzohorequest(endpoint,data) {
    if (!getAccessToken()) {
        await refreshAccessToken();
    }

    const headers = {
        'Authorization': `Zoho-oauthtoken ${getAccessToken()}`,
        'Content-Type': 'application/json'
    };

    try {
        console.log("job details:",endpoint,"data",data)
        const response = await axios.post(`${ZOHO_RECRUIT_API_URL}/${endpoint}`,buildJobData(data), { headers });
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            await refreshAccessToken();
            headers.Authorization = `Zoho-oauthtoken ${getAccessToken()}`;
            const retryResponse = await axios.get(`${ZOHO_RECRUIT_API_URL}/${endpoint}`, { headers });
            return retryResponse;
        }
        throw error;
    }
}
async function createcandidaterequest(endpoint,data) {
    if (!getAccessToken()) {
        await refreshAccessToken();
    }

    const headers = {
        'Authorization': `Zoho-oauthtoken ${getAccessToken()}`,
        'Content-Type': 'application/json'
    };

    try {
        console.log("candidate enpoint:",endpoint,"body",data)
        const response = await axios.post(`${ZOHO_RECRUIT_API_URL}/${endpoint}`,data, { headers });
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            await refreshAccessToken();
            headers.Authorization = `Zoho-oauthtoken ${getAccessToken()}`;
            const retryResponse = await axios.get(`${ZOHO_RECRUIT_API_URL}/${endpoint}`, { headers });
            return retryResponse;
        }
        throw error;
    }
}

async function assoicatecandidaterequest(endpoint,data) {
    if (!getAccessToken()) {
        await refreshAccessToken();
    }

    const headers = {
        'Authorization': `Zoho-oauthtoken ${getAccessToken()}`,
        'Content-Type': 'application/json'
    };

    try {
        console.log("candidate assoicate:",endpoint,"body",data)
        const response = await axios.put(`${ZOHO_RECRUIT_API_URL}/${endpoint}`,data, { headers });
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            await refreshAccessToken();
            headers.Authorization = `Zoho-oauthtoken ${getAccessToken()}`;
            const retryResponse = await axios.get(`${ZOHO_RECRUIT_API_URL}/${endpoint}`, { headers });
            return retryResponse;
        }
        throw error;
    }
}

module.exports = { makeZohoRequest,jobpostzohorequest ,createcandidaterequest,assoicatecandidaterequest};
