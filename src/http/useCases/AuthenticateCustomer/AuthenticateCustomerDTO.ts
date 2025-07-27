export interface IAuthenticateCustomerRequestDTO {
  email: string;
  name: string;
}

export interface IAuthenticateCustomerResponseDTO {
  token: string;
}