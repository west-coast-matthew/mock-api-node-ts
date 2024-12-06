const sharp = require('sharp');

const IMG_FULL_WIDTH = 750;
const IMG_FULL_HEIGHT = 750;
const IMG_THUMB_WIDTH = 150;
const IMG_THUMB_HEIGHT = 150;

export const generateMockImage = async (label:string, bgColor: string, thumbnail:boolean=false)=>{
    // Create a blank image
    const image = await sharp({
      create: {
        width: thumbnail ? IMG_THUMB_WIDTH : IMG_FULL_WIDTH,
        height: thumbnail ? IMG_THUMB_HEIGHT : IMG_FULL_HEIGHT,
        channels: 4,
        background: { r: 255, g: 0, b: 0, alpha: 1 } // Red background
      }
    });
  
    // Optionally, add some content to the image
    image.composite([
      { 
        input: Buffer.from('Hello World!'), // Text to draw
        top: 20, 
        left: 20, 
        gravity: 'northwest' 
      }
    ]);
  
    return image.png();
  }
