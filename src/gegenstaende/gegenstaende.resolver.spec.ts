import { Test, TestingModule } from '@nestjs/testing';
import { KistenService } from '@src/kisten/kisten.service';
import { GegenstaendeResolver } from './gegenstaende.resolver';
import { GegenstaendeService } from './gegenstaende.service';

class GegenstaendeServiceMock {}
class KistenServiceMock {}

describe('GegenstaendeResolver', () => {
  let resolver: GegenstaendeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GegenstaendeResolver,
        { provide: GegenstaendeService, useClass: GegenstaendeServiceMock },
        { provide: KistenService, useClass: KistenServiceMock },
      ],
    }).compile();

    resolver = module.get<GegenstaendeResolver>(GegenstaendeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
