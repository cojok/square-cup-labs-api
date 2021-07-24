import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { LoggerModule } from 'nestjs-pino/dist';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConnectorsModule } from './connectors/connectors.module';
import { DbModule } from './db/db.module';
import { HealthController } from './health/health.controller';
import { Office365Module } from './office365/office365.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';
import { GoogleWorkspaceModule } from './google-workspace/google-workspace.module';

@Module({
  imports: [
    DbModule,
    UserModule,
    TerminusModule,
    UtilsModule,
    ConfigModule,
    AuthModule,
    ConnectorsModule,
    Office365Module,
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: {
          colorize: true,
          levelFirst: true,
          translateTime: 'GMT:dd.mm.yyyy, h:MM:s',
        },
      },
    }),
    GoogleWorkspaceModule,
  ],
  controllers: [HealthController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private appService: AppService) {}

  onApplicationBootstrap() {
    return this.appService.generateTypeormConfigFile();
  }
}
