export interface User {
    id: string;
    username: string;
    passwordHash: string;
    token: string | null;
  }
  