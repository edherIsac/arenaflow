import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/core/models/schemas/user.schema';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) return null;

    const passwordMatches = await bcrypt.compare(pass, user.password);
    if (passwordMatches) {
      const { ...result } = user.toObject();

      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      error: false,
      message: 'Login correcto',
      data: {
        user,
        access_token: this.jwtService.sign(payload),
      },
    };
  }
}
