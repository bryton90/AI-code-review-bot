const ESLint = require('eslint').ESLint;
const sarifFormatter = require('@microsoft/eslint-formatter-sarif');

const analyzeCode = async (code) => {
  const eslintInstance = new ESLint({
    useEslintrc: false,
    baseConfig: {
      parserOptions: {
        ecmaVersion: 2022
      }
    }
  });
  const results = await eslintInstance.lintText(code);
  const formatter = await sarifFormatter(results);
  const issues = [];
  if (code.includes('console.log')) {
    issues.push('Avoid using console.log in production code.');
  }
  if (code.includes('eval(')) {
    issues.push('Avoid using eval for security reasons.');
  }
  const feedback = issues.join('\n');
  const score = issues.length === 0 ? 5 : 2; // Simple scoring logic
  return { feedback, score };
};

module.exports = {
  analyzeCode,
};
