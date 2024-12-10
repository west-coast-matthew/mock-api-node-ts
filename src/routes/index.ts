// import { Router } from 'express';
import { Router } from 'express';

import customerRouter from './customer.router';
import imageRouter from './image.router';
import pdfRouter from './pdf.router';
import statesRouter from './states.router';
import demoRouter from './demo.route';
import fileRouter from './binaryFile.router';

const router = Router();

router.use('/customer', customerRouter);
router.use('/image', imageRouter);
router.use('/pdf', pdfRouter);
router.use('/region', statesRouter);
router.use('/file', fileRouter);
// router.use('/demo', express.static('demo'));

export default router;