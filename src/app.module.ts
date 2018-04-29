import { Module } from '@nestjs/common';
import { AppController } from './infrastructure/server/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  components: [],
})
export class AppModule {}
