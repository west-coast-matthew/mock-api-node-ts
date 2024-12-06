import { Request, Response, NextFunction } from 'express';
import { mockDelay } from '../utils/request.utils';

const delayMiddleware = async(req: Request, res: Response, next: NextFunction) => {    
    
    const delay:number = req.query.delay? Number(req.query.delay) : -1;

    if(delay>-1){
        await mockDelay(delay)
    }

    next();
};

export default delayMiddleware;