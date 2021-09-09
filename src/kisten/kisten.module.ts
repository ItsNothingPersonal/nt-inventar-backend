import { Module } from '@nestjs/common';
import { GegenstaendeService } from '@src/gegenstaende/gegenstaende.service';
import { PrismaService } from '@src/prisma.service';
import { KisteGegenstandResolver } from './kiste-gegenstand.resolver';
import { KistenResolver } from './kisten.resolver';
import { KistenService } from './kisten.service';

@Module({
  providers: [
    KistenService,
    KistenResolver,
    PrismaService,
    KisteGegenstandResolver,
    GegenstaendeService,
  ],
  exports: [KistenService],
})
export class KistenModule {}
