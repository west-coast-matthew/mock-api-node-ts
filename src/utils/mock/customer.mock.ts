import Customer from "../../types/customer.type";
import minifaker from 'minifaker';
import 'minifaker/locales/en';

const CUSTOMER_COUNT = 1000;

function generateCustomerData(): Customer {
  
  return {
    id: Math.floor(Math.random() * 1000000) + 1,
    firstName: minifaker.firstName(),
    lastName: minifaker.lastName(),
    email: minifaker.email(),
    phoneNumber: minifaker.phoneNumber(),
    address: {
      street: minifaker.streetAddress(),
      city: minifaker.cityName(),
      state: minifaker.state(),
      zipCode: minifaker.zipCode(),
    },
  };
}

export const initCustomerStore = (): Array<Customer>=>{
  const results:Array<Customer> = [];
  for( let x=0;x<CUSTOMER_COUNT;x++){
    results.push(generateCustomerData());
  }
  return results;
}