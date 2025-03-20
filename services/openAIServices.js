import axios from 'axios';
const axios = require('axios');
require('dotenv').config();

const openAiApiKey = process.env.OPENAI_API_KEY;

const reviewCode = async (code) => {
  const prompt = `Review the following code and provide feedback on code quality and security flaws:\n\n${code}`;
  const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
    prompt,
    max_tokens: 150,
  }, {
    headers: {
      Authorization: `Bearer ${openAiApiKey}`,
    },
  });
  const feedback = response.data.choices[0].text.trim();
  const score = feedback.includes('good') ? 5 : feedback.includes('improve') ? 3 : 2;  // Simple scoring logic
  return { feedback, score };
};

module.exports = {
  reviewCode,
};
