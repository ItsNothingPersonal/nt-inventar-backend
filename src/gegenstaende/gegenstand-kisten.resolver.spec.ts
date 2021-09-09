import { Test, TestingModule } from '@nestjs/testing';
import { KistenService } from '@src/kisten/kisten.service';
import { PrismaService } from '@src/prisma.service';
import { GegenstandKistenResolver } from './gegenstand-kisten.resolver';

class PrismaServiceMock {}
class KistenServiceMock {}

describe('GegenstandKistenResolver', () => {
  let resolver: GegenstandKistenResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GegenstandKistenResolver,
        { provide: PrismaService, useClass: PrismaServiceMock },
        { provide: KistenService, useClass: KistenServiceMock },
      ],
    }).compile();

    resolver = module.get<GegenstandKistenResolver>(GegenstandKistenResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
