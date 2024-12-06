import { Router, Request, Response } from 'express';
import fs from 'fs';
import {generateMockImage} from '../utils/mock/image.mock';
const sharp = require('sharp');

/**
 * Image router
 * 
 * Supports the ability to retrieve a collection of thumbnails and full sized images. 
 *  
 */
const router = Router();

const MAX_IMG_COUNT = 10;


const mockImageRefs = ()=>{
  
  const imgRefs:Array<string> = [];
  for( let x=0;x<MAX_IMG_COUNT;x++ ){
    imgRefs.push(`img-${x}.svg`);
  }

  return imgRefs;
}

const imageRefs = mockImageRefs();

/**
 * Retrieve a list of all available images.
 */
router.get('/', async (req: Request, res: Response) => {

  res.send(JSON.stringify(imageRefs));
    
});

/**
 * Retrieve a specific image. 
 * 
 * Accepts optional argument to display full size, otherwise image defaults to 
 * a thumbnail representation.
 * 
 */
router.get('/:id', async (req: Request, res: Response)=>{
  console.log(`Generating a png image...`);

  res.setHeader('Content-type', 'image/png');

  // const img = generateMockImage('','');

  const pdfName:string  = req.params.id;

  const mockImage = await sharp({
    create: {
      width: 548,
      height: 548,
      channels: 4,
      background: { r: 255, g: 0, b: 0, alpha: 0.5 }
    }
  }).composite([
    {
      input: Buffer.from(
        `<svg width="250" height="100">
          <text x="50%" y="50%" text-anchor="middle" font-family="Arial" font-size="30" fill="white">${pdfName}</text>
        </svg>`
      ),
      blend: 'over'
    }
  ]).png().toBuffer(); 

  
    res.send(mockImage);
    res.end();

    console.log(`image returned!!!`);
    

    //const generateMockImage = (label:string, bgColor: string, thumbnail:boolean=false)=>{
  
    /*
    const png = await generateMockImage('aaaaa', '', false);
  
  res.send(png.toBuffer());
    res.end();
  */
  
    // ...

    /*
    const image = await sharp({
      create: {
        width: 400,
        height: 400,
        channels: 4,
        background: { r: 255, g: 0, b: 0, alpha: 1 } // Red background
      }
    });
  

  
    res.send(image.png().toBuffer()); */

  });

export default router;