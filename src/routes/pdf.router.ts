import { Router, Request, Response } from 'express';
import { PDFDocument, PageSizes, StandardFonts, rgb } from 'pdf-lib'
import { LoremIpsum } from "lorem-ipsum";

const router = Router();
const lorem = new LoremIpsum();

async function getMockPDF(title: string) {
  const pdfDoc = await PDFDocument.create()
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const fontSize = 30
  page.drawText(`Creating PDFs in JavaScript is awesome! ${title}`, {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })

  const pdfBytes = await pdfDoc.save()
  console.log(pdfBytes);
}

const PDF_COUNT = 50;


/**
 * Retrieve list of available PDFs.
 */
router.get('/', (req: Request, res: Response)=>{
    
  const refs:Array<String> = [];

    for(let x=0;x<PDF_COUNT;x++ ){
      refs.push(`pdf_${x}`);
    }

    const data = JSON.stringify(refs);

    res.setHeader(`Content-Type`,`application/json`);
    res.set('Access-Control-Allow-Origin', '*');
    res.send(
      JSON.stringify(Array.from(refs))
    );

});

/**
 * Get an PDF from memory by unique id.
 */
router.get('/:id', async(req: Request, res: Response)=>{
  const pdfRef:string = req.params.id;
  
  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const fillerText = lorem.generateParagraphs(3);
  
  let page = pdfDoc.addPage();
  page.moveTo(5, 700);
  const {width, height} = page.getSize();

  const title = `Document ${pdfRef}`;

  page.drawText(title, {x:( 50), y:800});
  
  // const textLine = { text:'CERTIFICATE OF COMPLETION', color:rgb(0,0,0), fontSize:24, marginTop:0 };
  //const textWidth = font.widthOfTextAtSize(textLine.text, textLine.fontSize);

  for(let x=1;x<11;x++){
    page = pdfDoc.addPage();
    page.drawText(`Page ${x}`, {x: 25, y:800});

    const text = page.drawText(fillerText, {
      x: 50,
      y: 700,
      // size: textLine.fontSize,
      // color: textLine.color,
      maxWidth: 500, 
      wordBreaks: [" "]
    });
  }
  
  const pdfBytes = await pdfDoc.save()

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Length', pdfBytes.length);
  res.set('Access-Control-Allow-Origin', '*');

  res.write(pdfBytes);
  res.end();

});


export default router;