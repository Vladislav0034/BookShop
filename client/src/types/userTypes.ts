export type UserType = {
    id: number;
    username: string;
    email: string;
  };
  
  export type UserSignUpType = Omit<UserType, 'id'> & { password: string };
  export type UserSignInType = Omit<UserSignUpType, 'username'>;
  export type UserFromBackendType = { accessToken: string; user: UserType };
  
  export type UserStateType =
    | { status: 'fetching' }
    | { status: 'guest' }
    | ({ status: 'logged' } & UserType);
  