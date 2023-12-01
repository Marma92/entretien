import express, { Express, Request, Response } from 'express';
import productsRouter from './routes/products';
import cors from 'cors'

const app: Express = express();
const port = 8080;

app.use(cors());

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