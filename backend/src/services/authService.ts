import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/userRepository';
import { generateToken } from '../utils/jwt';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user.id, user.role);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      token,
    };
  }

  // Used only initially to seed an admin (should be secured or removed later)
  async registerAdmin(email: string, password: string) {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Admin already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      role: 'ADMIN',
    });

    const token = generateToken(user.id, user.role);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      token,
    };
  }
}
