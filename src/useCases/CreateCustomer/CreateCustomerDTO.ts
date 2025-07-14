export interface ICreateCustomerRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface ICreateCustomerResponseDTO {
  token: string;
}