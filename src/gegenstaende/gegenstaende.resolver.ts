import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Gegenstand } from '@prisma/client';
import { GqlAuthGuard } from '@src/authz/guards/gql-auth.guard';
import { KistenService } from '@src/kisten/kisten.service';
import { DeleteGegenstand, GegenstandOrderByInput } from '@src/types/graphql';
import { AddGegenstandInputDto } from './dto/addGegenstandInput.dto';
import { UpdateGegenstandInputDTO } from './dto/updateGegenstandInput.dto';
import { GegenstaendeService } from './gegenstaende.service';

@Resolver('Gegenstand')
export class GegenstaendeResolver {
  constructor(
    private readonly gegenstaendeService: GegenstaendeService,
    private readonly kistenService: KistenService,
  ) {}

  @Query()
  async gegenstandById(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<Gegenstand> {
    return this.gegenstaendeService.findUniqueById(id);
  }

  @Query()
  async alleGegenstaende(
    @Args('filter') filter: string,
    @Args('skip') skip: number,
    @Args('take') take: number,
    @Args('orderBy') orderBy: GegenstandOrderByInput,
  ): Promise<Gegenstand[]> {
    return this.gegenstaendeService.findMany(filter, skip, take, orderBy);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async addGegenstand(
    @Args('input') input: AddGegenstandInputDto,
  ): Promise<Gegenstand> {
    if (!input?.kiste && !input?.kisteID) {
      throw new Error(
        'Benötige Angaben zu einer Kiste! Entweder die ID einer bestehenden Kiste oder die notwendigen Angaben zum erzeugen einer neuen Kiste!',
      );
    }

    const kisteID = input.kisteID ? input.kisteID : -1;

    const kiste =
      kisteID !== -1
        ? await this.kistenService.findUniqueById(kisteID)
        : input.kiste;

    return this.gegenstaendeService.create(input, kisteID, kiste);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async deleteGegenstand(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<DeleteGegenstand> {
    return this.gegenstaendeService.delete(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async updateGegenstand(
    @Args('id', ParseIntPipe) id: number,
    @Args('input') input: UpdateGegenstandInputDTO,
  ): Promise<Gegenstand> {
    return this.gegenstaendeService.update(id, input);
  }
}
