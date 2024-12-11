import { Router, Request, Response } from 'express';
import Customer from '../types/customer.type'; 
import {getPageParameters, getDelayAmount, mockDelay, } from '../utils/request.utils';
import {initCustomerStore} from '../utils/mock/customer.mock';

const router = Router();

const customers:Array<Customer> = initCustomerStore();

router.get('/', async (req: Request, res: Response) => {
    const {startIndex, endIndex} = getPageParameters(req);
    const customerSet = customers.slice(startIndex, endIndex);
    console.log('customer id:', customers[customers.length-1]);
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-type','application/json');
    res.send(customerSet
    );
  });

  router.get('/:id', async (req: Request, res: Response) => {
    console.log(req.params.id);
    
    const selCustomer = customers.find((cust)=>{
      return cust.id === Number(req.params.id) ? cust : null;
    });
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-type','application/json');
    console.log('selCustomer',selCustomer);
    res.send(selCustomer);
    
  });

export default router;