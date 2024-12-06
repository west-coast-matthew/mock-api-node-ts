import express, { Request, Response } from 'express';
import router from './src/routes';
import paginationParams from './src/middleware/pagination.middleware';

const app = express();
app.use(paginationParams);

const PORT = process.env.PORT || 3000;

app.use('/', router);

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});