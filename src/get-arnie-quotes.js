const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  // Create array of promises for each URL
  const httpGetPromises = urls.map((url) => httpGet(url));

  // Wait for all promises to resolve
  const responses = await Promise.all(httpGetPromises);

  const results = responses.map((response) =>
    response.status === 200
      ? // Parse the response body and add the result
        { 'Arnie Quote': JSON.parse(response.body).message }
      : { FAILURE: JSON.parse(response.body).message }
  );

  return results;
};

module.exports = {
  getArnieQuotes,
};
