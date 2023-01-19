type UserName = {
  first: string;
  last: string;
};

export interface User {
  email: string;
  name: UserName;
}

export interface UserResponse {
  results: User[];
}
