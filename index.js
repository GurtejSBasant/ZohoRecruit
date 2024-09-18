// index.js
const express = require('express');
const app = express();
const jobRoutes = require('./routes/jobpostroutes');
const cors = require('cors');


// Define the allowed origins
const allowedOrigins = [
    'https://newadmin.sourcebae.com',
    'https://sourcebae.com',
    'https://sourcebaeadmin.shethink.in',
    "http://localhost:3000"
];

// CORS options
const corsOptions = {
    origin: (origin, callback) => {
        // Check if the origin is in the allowed origins list or if it is undefined (for non-browser clients)
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'POST, GET, OPTIONS, PUT, DELETE', // Allow specified methods
    allowedHeaders: 'Content-Type', // Allow specified headers
};

// Use CORS middleware with the specified options
app.use(cors(corsOptions));




app.use(express.json());
app.use('/zoho', jobRoutes);

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
