import { Test, TestingModule } from '@nestjs/testing';
import { GegenstaendeService } from '@src/gegenstaende/gegenstaende.service';
import { KisteGegenstandResolver } from './kiste-gegenstand.resolver';

class GegenstaendeServiceMock {}

describe('KisteGegenstandResolver', () => {
  let resolver: KisteGegenstandResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KisteGegenstandResolver,
        { provide: GegenstaendeService, useClass: GegenstaendeServiceMock },
      ],
    }).compile();

    resolver = module.get<KisteGegenstandResolver>(KisteGegenstandResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
