// services/jobService.js
const { jobpostzohorequest,createcandidaterequest,assoicatecandidaterequest } = require('../utils/zohoutils');

async function postJobToZoho(jobData) {
    const endpoint = 'JobOpenings';
    try {
        const response = await jobpostzohorequest(endpoint, jobData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
async function createcandidate(jobData) {
    const endpoint = 'Candidates';
    try {
        const response = await createcandidaterequest(endpoint, jobData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function assoicatecandidate(jobData) {
    const endpoint = 'Candidates/actions/associate';
    try {
        const response = await assoicatecandidaterequest(endpoint, jobData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

module.exports = { postJobToZoho,createcandidate,assoicatecandidate };
