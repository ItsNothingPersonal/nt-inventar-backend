import { Gegenstand, Kiste } from '.prisma/client';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GegenstaendeService } from '@src/gegenstaende/gegenstaende.service';

@Resolver('Kiste')
export class KisteGegenstandResolver {
  constructor(private readonly gegenstaendeService: GegenstaendeService) {}

  @ResolveField('gegenstaendeInKiste')
  async gegenstaendeInKiste(@Parent() kiste: Kiste): Promise<Gegenstand[]> {
    return this.gegenstaendeService.findManyGegenstaendeInKiste(kiste);
  }
}
