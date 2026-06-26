import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth-service';
import { AuthController } from './auth-controller';
import { PrismaService } from '../prisma/prisma-service'; 

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: '0d0d7a391ed5f45cac46a47f5507dc7994d6d04bccfb26ec4e995b09946404f1', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}