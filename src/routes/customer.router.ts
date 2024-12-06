import { Router, Request, Response } from 'express';
import Customer from '../types/customer.type'; 
import {getPageParameters, getDelayAmount, mockDelay, } from '../utils/request.utils';
import {initCustomerStore} from '../utils/mock/customer.mock';

const router = Router();

const customers:Array<Customer> = initCustomerStore();

router.get('/', async (req: Request, res: Response) => {

    const {startIndex, endIndex} = getPageParameters(req);
    const customerSet = customers.slice(startIndex, endIndex);
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-type','application/json');
    console.log(customerSet);
    res.send(customerSet
    );
  });

export default router;