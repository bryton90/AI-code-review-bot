const githubUtils = require('../utils/githubUtils');
const openAIService = require('../services/openAIService');
const staticAnalysisService = require('../services/staticAnalysisService');
const reviewModel = require('../models/review');

const handlePullRequest = async (event) => {
  const { pull_request } = event.payload;
  const prId = pull_request.id;
  const repoName = pull_request.base.repo.full_name;
  const prUrl = pull_request.html_url;

  // Fetch the PR code
  const prCode = await githubUtils.fetchPrCode(repoName, prId);

  // Perform static analysis
  const staticAnalysisResults = staticAnalysisService.analyzeCode(prCode);

  // Perform AI-based review
  const aiReviewResults = await openAIService.reviewCode(prCode);

  // Combine results
  const feedback = `
    Static Analysis Results: ${staticAnalysisResults.feedback}
    AI Review Results: ${aiReviewResults.feedback}
  `;
  const score = staticAnalysisResults.score + aiReviewResults.score;

  // Save the review
  await reviewModel.saveReview(prId, repoName, feedback, score);

  // Comment on the PR
  await githubUtils.commentOnPr(repoName, prId, feedback);
};

module.exports = {
  handlePullRequest,
};
