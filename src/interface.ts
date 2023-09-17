/**
 * @description User-Service parameters
 */

export interface IBaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IUserOptions {
  id: number;
  nickname: string;
  password: string;
}
