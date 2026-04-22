import { Injectable } from '@nestjs/common';
import { join } from 'node:path';
import { ensureJsonFile, writeJsonFile } from '../shared/file-store';
import { LoginDto, UserRecord } from './auth.types';

const DEMO_PHONE = '13800138000';
const DEMO_USER_ID = 'user_demo_001';

@Injectable()
export class AuthService {
  private readonly usersFile = join(process.cwd(), 'data', 'users.json');

  async login(payload: LoginDto) {
    const users = await ensureJsonFile<UserRecord[]>(this.usersFile, []);
    const phone = this.normalizePhone(payload.phone);
    const now = new Date().toISOString();

    const existingUser = users.find((item) => item.phone === phone);

    if (existingUser) {
      existingUser.nickname = payload.nickname?.trim() || existingUser.nickname;
      existingUser.avatar = payload.avatar?.trim() || existingUser.avatar;
      existingUser.lastLoginAt = now;

      await writeJsonFile(this.usersFile, users);

      return {
        token: `mock-token-${existingUser.id}`,
        user: existingUser,
      };
    }

    const user: UserRecord = {
      id: phone === DEMO_PHONE ? DEMO_USER_ID : `user_${Date.now()}`,
      phone,
      nickname: payload.nickname?.trim() || `用户${phone.slice(-4)}`,
      avatar:
        payload.avatar?.trim() ||
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
      createdAt: now,
      lastLoginAt: now,
    };

    users.unshift(user);
    await writeJsonFile(this.usersFile, users);

    return {
      token: `mock-token-${user.id}`,
      user,
    };
  }

  async listUsers() {
    return ensureJsonFile<UserRecord[]>(this.usersFile, []);
  }

  private normalizePhone(phone: string) {
    const normalized = String(phone || '').replace(/\D/g, '');
    return normalized || '13800138000';
  }
}
