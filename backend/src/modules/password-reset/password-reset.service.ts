import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordResetService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async requestReset(email: string): Promise<{ message: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Generar token de reset
    const resetToken = this.jwtService.sign(
      { userId: user._id },
      {
        secret: this.configService.get('JWT_RESET_SECRET'),
        expiresIn: '1h',
      },
    );

    // Enviar email con el token
    await this.mailService.sendPasswordReset(email, resetToken);

    return {
      message:
        'Si el email existe en nuestra base de datos, recibirás instrucciones para resetear tu contraseña',
    };
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_RESET_SECRET'),
      });

      const user = await this.userService.findOne(payload.userId);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      // Hash de la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualizar la contraseña
      await this.userService.update(user._id.toString(), {
        password: hashedPassword,
      });

      return {
        message: 'Contraseña actualizada exitosamente',
      };
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
