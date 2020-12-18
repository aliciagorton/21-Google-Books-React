const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

// API ROUTES
router.use('/api', apiRoutes);

// No API routes, send REACT
router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

module.exports = router;