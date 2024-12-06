import { Router, Request, Response } from 'express';
import { getRegions } from '../utils/region.utils';
import { Region } from '../types/region.type';

const router = Router();

const regions:Array<Region> = getRegions();

router.get('/', async (req: Request, res: Response) => {
   res.set('Access-Control-Allow-Origin', '*');
   res.set('Content-type','application/json');
   res.send(regions);
  });

export default router;