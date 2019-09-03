const server = require('./server.js');
const secrets = require('./config/secrets.js');

const PORT = secrets.PORT || 5050;

server.listen(PORT, () => {
  console.log(`\n*** Server now listening on port ${PORT}***\n`);
});
