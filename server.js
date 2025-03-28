const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins (or specify your frontend URL)
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    next();
  });

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(3000, () => {
    console.log('JSON Server is running');
  });