export interface UserRegisterDTO {
  name: string;
  email: string;
  birthdate: Date;
  nDni: number;
  username: string;
  password: string;
}

export interface UserLoginDTO {
  id: number;
  email: string;
  username: string;
  password: string;
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
}
