import { Module } from '@nestjs/common';
import { KistenService } from '@src/kisten/kisten.service';
import { PrismaService } from '@src/prisma.service';
import { GegenstaendeResolver } from './gegenstaende.resolver';
import { GegenstaendeService } from './gegenstaende.service';
import { GegenstandKistenResolver } from './gegenstand-kisten.resolver';

@Module({
  providers: [
    GegenstaendeService,
    GegenstaendeResolver,
    PrismaService,
    GegenstaendeService,
    GegenstandKistenResolver,
    KistenService,
  ],
  exports: [GegenstaendeService],
})
export class GegenstaendeModule {}
