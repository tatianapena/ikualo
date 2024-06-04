import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/authLogin.dto';
import { LocalGuard } from './guards/local.guard';
import { UseGuards } from '@nestjs/common';
import { AuthRegisterDto } from './dto/authRegister.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() authLoginDto: AuthLoginDto) {
    return await this.authService.login(authLoginDto);
  }
  @Post('register')
  async register(@Body() authRegisterDto: AuthRegisterDto) {
    return await this.authService.register(authRegisterDto);
  }
  @Post('validate')
  async validate(@Body() authLoginDto: AuthLoginDto) {
    return await this.authService.validate(authLoginDto);
  }
}
