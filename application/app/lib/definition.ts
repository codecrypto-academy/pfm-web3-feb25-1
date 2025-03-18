export interface User {
    address: string;
    name?: string;
    active?: boolean;
    role: string;
  }

export type FormState = {
  errors?: {
    address?: string[];
    name?: string[];
    role?: string[];
    _form?: string[];
  };
  success?: boolean;
  message?: string;
}