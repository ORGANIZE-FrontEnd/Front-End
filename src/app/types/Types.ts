export interface TokenDTO {
  jwt: string;
  expiresIn: number;
}

export interface LoginResponse {
  accessToken: TokenDTO;
  refreshToken: TokenDTO;
}

export interface getUserByIdReponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  createdAt: string;
  updatedAt: string;
  refreshToken: string | null;
  transactions: string | null;
  limitExpenses: string | null;
  enabled: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  authorities: Array<any>;
  username: string;
}

export interface DecodedToken {
  sub: string;
  exp: number;
  iat: number;
  jti: string;
}
export interface Transaction {
  id: string;
  description: string;
  price: number;
  category: string;
  startDate: string;
  isRecurring: true;
  recurrenceType: string;
  transactionType: "expense" | "income";
}