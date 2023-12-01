import express, { Express, Request, Response } from 'express';
import productsRouter from './routes/products';

const app: Express = express();
const port = 8080;

// Use the products router
app.use('/api', productsRouter);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// 404 route
app.use((req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});