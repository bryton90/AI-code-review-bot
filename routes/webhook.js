const express = require('express');
const { createHmac } = require('crypto');
const { Webhooks } = require('@octokit/webhooks');
const codeReviewController = require('../controllers/codeReviewController');
require('dotenv').config();

const router = express.Router();
const webhooks = new Webhooks({ secret: process.env.GITHUB_WEBHOOK_SECRET });

webhooks.on('pull_request.opened', async (event) => {
  await codeReviewController.handlePullRequest(event);
});

webhooks.on('pull_request.synchronize', async (event) => {
  await codeReviewController.handlePullRequest(event);
});

router.use(webhooks.middleware);

module.exports = router;
