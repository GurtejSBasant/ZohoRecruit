// index.js
const express = require('express');
const app = express();
const jobRoutes = require('./routes/jobpostroutes');

app.use(express.json());
app.use('/zoho', jobRoutes);

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
