const express = require('express');
const bodyParser = require('body-parser');
const webhookRoutes = require('./routes/webhook');
const reviewModel = require('./models/review');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/webhook', webhookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const start = async () => {
  try {
    await reviewModel.createReviewTable();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start().catch(error => {
  console.error('Unhandled error during startup:', error);
  process.exit(1);
});
