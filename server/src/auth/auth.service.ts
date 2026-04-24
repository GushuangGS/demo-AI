import { Injectable } from '@nestjs/common';
import { join } from 'node:path';
import { ensureJsonFile, writeJsonFile } from '../shared/file-store';
import { LoginDto, UserRecord } from './auth.types';

const DEMO_PHONE = '13800138000';
const DEMO_USER_ID = 'user_demo_001';

@Injectable()
export class AuthService {
  private readonly usersFile = join(process.cwd(), 'data', 'users.json');

  /**
   * 用户登录逻辑（模拟登录/注册一体化）
   * 1. 读取本地存储的用户数据
   * 2. 格式化并校验手机号
   * 3. 检查用户是否已存在，若存在则更新信息并直接登录
   * 4. 若不存在则创建新用户记录
   * 5. 保存数据并返回模拟的 JWT Token 和用户信息
   * @param payload 登录请求的数据载体（手机号、昵称、头像）
   */
  async login(payload: LoginDto) {
    // 步骤1：获取现有的用户列表，若文件不存在则初始化为空数组
    const users = await ensureJsonFile<UserRecord[]>(this.usersFile, []);

    // 步骤2：清理并规范化手机号
    const phone = this.normalizePhone(payload.phone);
    const now = new Date().toISOString();

    // 步骤3：查找是否已经是老用户
    const existingUser = users.find((item) => item.phone === phone);

    if (existingUser) {
      // 步骤4：老用户登录，更新其可能变更的昵称和头像，并更新最后登录时间
      existingUser.nickname = payload.nickname?.trim() || existingUser.nickname;
      existingUser.avatar = payload.avatar?.trim() || existingUser.avatar;
      existingUser.lastLoginAt = now;

      // 持久化更新后的数据
      await writeJsonFile(this.usersFile, users);

      // 返回模拟的身份凭证
      return {
        token: `mock-token-${existingUser.id}`,
        user: existingUser,
      };
    }

    // 步骤5：新用户注册，构造新的用户实体
    const user: UserRecord = {
      // 如果是内置演示账号，固定 ID 以匹配默认订单等关联数据
      id: phone === DEMO_PHONE ? DEMO_USER_ID : `user_${Date.now()}`,
      phone,
      // 默认昵称为“用户”+手机号后四位
      nickname: payload.nickname?.trim() || `用户${phone.slice(-4)}`,
      avatar:
        payload.avatar?.trim() ||
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
      createdAt: now,
      lastLoginAt: now,
    };

    // 步骤6：将新用户插入到列表最前面并保存
    users.unshift(user);
    await writeJsonFile(this.usersFile, users);

    return {
      token: `mock-token-${user.id}`,
      user,
    };
  }

  /**
   * 获取所有用户列表
   * 用于管理端查询或开发调试，确保文件存在后返回数据
   */
  async listUsers() {
    return ensureJsonFile<UserRecord[]>(this.usersFile, []);
  }

  /**
   * 规范化手机号
   * 去除传入字符串中的所有非数字字符，若为空则默认使用内置的演示账号手机号
   */
  private normalizePhone(phone: string) {
    const normalized = String(phone || '').replace(/\D/g, '');
    return normalized || '13800138000';
  }
}
