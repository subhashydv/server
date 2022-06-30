const router = (handlers, serveFrom) => (request, response) => {
  for (const handler of handlers) {
    if (handler(request, response, serveFrom)) {
      return true;
    }
  }
  return false;
};

module.exports = { router };