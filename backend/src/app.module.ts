import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Módulos de la aplicación
import { HealthModule } from './health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { LeagueModule } from './modules/league/league.module';
import { GroupModule } from './modules/group/group.module';
import { SeasonModule } from './modules/season/season.module';
import { PlayerModule } from './modules/player/player.module';
import { VenuesModule } from './modules/venues/venues.module';
import { MatchesModule } from './modules/matches/matches.module';
import { MatchesResultsModule } from './modules/matches-results/matches-results.module';
import { MsgGateway } from './core/common/msg.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        const isLocal = uri.includes('localhost') || uri.includes('127.0.0.1');
        const connectionType = isLocal ? 'LOCAL' : 'REMOTE';

        console.log(connectionType);

        return {
          uri: uri,
          retryAttempts: 3,
          retryDelay: 5000,
        };
      },
      inject: [ConfigService],
    }),
    ServeStaticModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const isProduction =
          configService.get<string>('NODE_ENV') === 'production';
        const publicPath = isProduction
          ? join(__dirname, 'public')
          : join(__dirname, '..', 'public-dev');

        return [
          {
            rootPath: publicPath,
          },
        ];
      },
      inject: [ConfigService],
    }),
    HealthModule,
    AuthModule,
    UserModule,
    CategoriaModule,
    LeagueModule,
    GroupModule,
    SeasonModule,
    PlayerModule,
    VenuesModule,
    MatchesModule,
    MatchesResultsModule,
  ],
  controllers: [],
  providers: [MsgGateway],
})
export class AppModule {}
