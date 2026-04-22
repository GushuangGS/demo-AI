export interface LoginDto {
  phone: string;
  nickname?: string;
  avatar?: string;
}

export interface UserRecord {
  id: string;
  phone: string;
  nickname: string;
  avatar: string;
  lastLoginAt: string;
  createdAt: string;
}
