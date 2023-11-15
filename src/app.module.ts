import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { configs } from './configs';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [MongooseModule.forRoot(configs.DATABASE_URI), UsersModule, AuthModule, CourseModule, ResultModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
