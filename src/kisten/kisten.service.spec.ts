import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@src/prisma.service';
import { KistenService } from './kisten.service';

class PrismaServiceMock {}

describe('KistenService', () => {
  let service: KistenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KistenService,
        { provide: PrismaService, useClass: PrismaServiceMock },
      ],
    }).compile();

    service = module.get<KistenService>(KistenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
