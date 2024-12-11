/**
 * Router/controller for emulating large binary file downloads. Usefull for establishing 
 * a use case where a large amount of data is returned to the client.
 * 
 */

// res.set('Access-Control-Allow-Origin', '*');

import { Router, Request, Response } from 'express';

const router = Router();

const fileNames = ['file1','file2','file3'];

router.get('/', (req: Request, res: Response)=>{
    res.send(fileNames);
});

function createEmptyFileInMemory(sizeInBytes:number) {
    const buffer = Buffer.alloc(sizeInBytes *  (1024 * 1024)); // Create a zero-filled buffer of the specified size
    return buffer; 
  }

router.get('/:id', (req: Request, res: Response)=>{

    const fileSize = req.params.fileSize ? Number(req.params.fileSize) : 50;

    const fileContents = createEmptyFileInMemory(fileSize);

    res.setHeader('Content-Type', 'application/octet-stream');
    //TODO: Conditionally send length of file in headers.
    console.log(req.params.returnLength);
    //if(req.params.returnLength ){
        res.setHeader('Content-Length', fileContents.length);
    //}
    
    
    res.send(fileContents);
    res.end();
});

export default router;