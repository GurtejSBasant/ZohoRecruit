// controllers/jobController.js
const { postJobToZoho,createcandidate,assoicatecandidate } = require('../services/jobservices');
const { makeZohoRequest } = require('../utils/zohoutils');


//Job post and job fetch
async function postJob(req, res) {
    try {
        const jobData = req.body;
        const endpoint="JobOpenings"
        const result = await postJobToZoho(jobData);
        res.status(200).json({ message: "Job posting attempt completed", data: result });
    } catch (error) {
        console.error('Error posting job:', error.response?.data || error.message);
        res.status(500).json({ 
            message: "Failed to post job", 
            error: error.response?.data || error.message 
        });
    }
}

async function getAllJobOpenings(req, res) {
    try {
        const response = await makeZohoRequest('JobOpenings');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching job openings:', error.response?.data || error.message);
        res.status(500).json({ error: 'An error occurred while fetching job openings' });
    }
}

async function getJobOpeningById(req, res) {
    try {
        const jobId = req.params.id;
        const response = await makeZohoRequest(`JobOpenings/${jobId}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching specific job opening:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'An error occurred while fetching the job opening',
            details: error.response?.data || error.message
        });
    }
}

//Candidate

async function createCandidate(req, res) {
    try {
        const data = req.body;
        const result = await createcandidate(data);
        res.status(200).json({ message: "Candidate Created Successfully", data: result });
    } catch (error) {
        console.error('Error posting job:', error.response?.data || error.message);
        res.status(500).json({ 
            message: "Failed to post job", 
            error: error.response?.data || error.message 
        });
    }
}


async function assoicateCandidate(req, res) {
    try {
        const data = req.body;
        const result = await assoicatecandidate(data);
        res.status(200).json({ message: "Candidate Assoicated Successfully", data: result });
    } catch (error) {
        console.error('Error posting job:', error.response?.data || error.message);
        res.status(500).json({ 
            message: "Failed to post job", 
            error: error.response?.data || error.message 
        });
    }
}


//Fetch candidate based on there jobsId


async function fetchAssoicateCandidatewithsJobsaId(req, res) {
    try {
        const id = req.params.id;
        const response = await makeZohoRequest(`Job_Openings/${id}/associate`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching specific job opening:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'An error occurred while fetching the job opening',
            details: error.response?.data || error.message
        });
    }
}

module.exports = { postJob, getAllJobOpenings, getJobOpeningById,createCandidate,assoicateCandidate,fetchAssoicateCandidatewithsJobsaId };
