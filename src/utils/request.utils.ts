import { Request} from 'express';

export const getPageParameters = (req: Request)=>{
    const page:number = Number(req.query.page); 
    const limit:number = Number(req.query.limit);
    const startIndex = (page -1 ) * limit;
    const endIndex = page * limit;
    
    return {'startIndex': startIndex, 'endIndex': endIndex};
}

export const getDelayAmount = (req: Request):number=>{
    if(req.query.delay){
      return Number(req.query.delay);
    }
  
    return -1;
  }

export function mockDelay(seconds:number) {
    return new Promise(resolve => setTimeout(resolve, (seconds * 1000)));
}