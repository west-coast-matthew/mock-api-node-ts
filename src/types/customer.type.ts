export default interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  }