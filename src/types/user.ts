type UserName = {
  first: string;
  last: string;
};

export interface User {
  email: string;
  name: UserName;
  picture: {
    thumbnail: string;
    medium: string;
  };
}

export interface UserResponse {
  results: User[];
}
