import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Gegenstand, Kiste } from '@prisma/client';
import { KistenService } from '@src/kisten/kisten.service';

@Resolver('Gegenstand')
export class GegenstandKistenResolver {
  constructor(private readonly kistenService: KistenService) {}

  @ResolveField()
  async istInKiste(@Parent() gegenstand: Gegenstand): Promise<Kiste> {
    return this.kistenService.findUniqueByGegenstandId(gegenstand.id);
  }
}
