import { Test, TestingModule } from '@nestjs/testing';
import { KistenService } from '@src/kisten/kisten.service';
import { PrismaService } from '@src/prisma.service';
import { GegenstaendeService } from './gegenstaende.service';

class PrismaServiceMock {}
class KistenServiceMock {}

describe('GegenstaendeService', () => {
  let service: GegenstaendeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GegenstaendeService,
        { provide: PrismaService, useClass: PrismaServiceMock },
        { provide: KistenService, useClass: KistenServiceMock },
      ],
    }).compile();

    service = module.get<GegenstaendeService>(GegenstaendeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
