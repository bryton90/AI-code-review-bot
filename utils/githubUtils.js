const axios = require('axios');
require('dotenv').config();

const githubToken = process.env.GITHUB_TOKEN;

const fetchPrCode = async (repoName, prId) => {
  const url = `https://api.github.com/repos/${repoName}/pulls/${prId}/files`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  });
  const files = response.data;
  let prCode = '';
  for (const file of files) {
    prCode += file.patch || '';
  }
  return prCode;
};

const commentOnPr = async (repoName, prId, feedback) => {
  const url = `https://api.github.com/repos/${repoName}/issues/${prId}/comments`;
  await axios.post(url, { body: feedback }, {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  });
};

module.exports = {
  fetchPrCode,
  commentOnPr,
};
