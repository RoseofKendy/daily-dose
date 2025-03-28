const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins (or specify your frontend URL)
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.delete('/favorites', (req, res) => {
    const db = router.db; // Get lowdb instance
    db.set('favorites', []).write(); // Reset favorites array
    res.status(200).json({ message: 'All favorites cleared' });
  });

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('JSON Server is running');
  });