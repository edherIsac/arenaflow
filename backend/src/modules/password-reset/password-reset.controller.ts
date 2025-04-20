import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PasswordResetService } from './password-reset.service';
import { RequestResetDto } from './dto/request-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Password Reset')
@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post('request')
  @ApiOperation({ summary: 'Solicitar reset de contraseña' })
  async requestReset(@Body() requestResetDto: RequestResetDto) {
    return this.passwordResetService.requestReset(requestResetDto.email);
  }

  @Post('reset')
  @ApiOperation({ summary: 'Resetear contraseña con token' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.passwordResetService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.password,
    );
  }
}
