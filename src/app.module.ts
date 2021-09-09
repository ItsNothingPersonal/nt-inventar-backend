import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AuthzModule } from './authz/authz.module';
import { GegenstaendeModule } from './gegenstaende/gegenstaende.module';
import { GegenstaendeService } from './gegenstaende/gegenstaende.service';
import { KistenModule } from './kisten/kisten.module';
import { KistenService } from './kisten/kisten.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: true,
    }),
    GegenstaendeModule,
    KistenModule,
    AuthzModule,
  ],
  providers: [PrismaService, GegenstaendeService, KistenService],
})
export class AppModule {}
