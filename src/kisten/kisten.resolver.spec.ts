import { Test, TestingModule } from '@nestjs/testing';
import { KistenResolver } from './kisten.resolver';
import { KistenService } from './kisten.service';

class KistenServiceMock {}

describe('KistenResolver', () => {
  let resolver: KistenResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KistenResolver,
        { provide: KistenService, useClass: KistenServiceMock },
      ],
    }).compile();

    resolver = module.get<KistenResolver>(KistenResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
