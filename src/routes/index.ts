// import { Router } from 'express';
import { Router } from 'express';

import customerRouter from './customer.router';
import imageRouter from './image.router';
import pdfRouter from './pdf.router';
import statesRouter from './states.router';
import demoRouter from './demo.route';
import fileRouter from './binaryFile.router';

const router = Router();

router.use('/mock/customer', customerRouter);
router.use('/mock/image', imageRouter);
router.use('/mock/pdf', pdfRouter);
router.use('/mock/region', statesRouter);
router.use('/mock/file', fileRouter);
// router.use('/demo', express.static('demo'));

export default router;