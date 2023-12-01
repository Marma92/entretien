import * as fs from 'fs/promises';
import { Router, Request, Response, NextFunction } from 'express';
import { fetchProductMetadata } from '../utils/filters';

const dataFile = 'data/tmp.json'
const router = Router();

router.get('/mission-apprentissage/products-lazy', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jsonData = await fs.readFile(dataFile, 'utf-8');
    const parsedData = JSON.parse(jsonData);
    res.json(parsedData);
  } catch (error) {
    console.error('Error reading data.json:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/mission-apprentissage/products', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const owner = 'betagouv';
    const repository = 'beta.gouv.fr';
    const path = 'content/_startups';

    const products = await fetchProductMetadata(owner, repository, path);
    res.json(products);
  } catch (error) {
    console.error('Error processing the request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;