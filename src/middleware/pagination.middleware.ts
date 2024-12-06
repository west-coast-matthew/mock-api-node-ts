import { Request, Response, NextFunction } from 'express';

/**
 * Middleware for setting default pagination parameters into the 
 * request parameters when not provided by the client.
 * 
 */
interface PaginationParams {
    page: string;
    limit: string;
}

const PAGE_SIZE_DEFAULT = '1';
const PAGE_LIMIT_DEFAULT = '10';

const paginationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { page = PAGE_SIZE_DEFAULT, limit = PAGE_LIMIT_DEFAULT } = req.query as unknown as PaginationParams;
    req.query.page = page;
    req.query.limit = limit;
    next();
};

export default paginationMiddleware;