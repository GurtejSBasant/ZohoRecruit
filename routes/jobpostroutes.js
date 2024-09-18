// routes/jobRoutes.js
const express = require('express');
const { postJob, getAllJobOpenings, getJobOpeningById,createCandidate,assoicateCandidate,fetchAssoicateCandidatewithsJobsaId } = require('../controller/jobcontroller');

const router = express.Router();


//Jobs
router.post('/post_job', postJob);
router.get('/job-openings', getAllJobOpenings);
router.get('/job-openings/:id', getJobOpeningById);

//Candidate
router.post('/create-candidate', createCandidate);
router.put('/assoicate-candidate', assoicateCandidate);


//fetch candidates assoicated with job
router.get('/fetch-candidate-with-jobid/:id', fetchAssoicateCandidatewithsJobsaId);
module.exports = router;
