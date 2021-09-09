import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Kiste } from '@prisma/client';
import { GqlAuthGuard } from '@src/authz/guards/gql-auth.guard';
import {
  AddKisteInput,
  DeleteKiste,
  KisteOrderByInput,
  UpdateKisteInput,
} from '@src/types/graphql';
import { KistenService } from './kisten.service';

@Resolver('Kiste')
export class KistenResolver {
  constructor(private readonly kistenService: KistenService) {}

  @Query()
  async kisteById(@Args('id', ParseIntPipe) id: number): Promise<Kiste> {
    return this.kistenService.findUniqueById(id);
  }

  @Query()
  async alleKisten(
    @Args('filter') filter: string,
    @Args('skip') skip: number,
    @Args('take') take: number,
    @Args('orderBy') orderBy: KisteOrderByInput,
  ): Promise<Kiste[]> {
    return this.kistenService.findMany(filter, skip, take, orderBy);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async addKiste(@Args('input') input: AddKisteInput): Promise<Kiste> {
    return this.kistenService.create(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async deleteKiste(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<DeleteKiste> {
    return this.kistenService.delete(id) as Promise<DeleteKiste>;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async updateKiste(
    @Args('id', ParseIntPipe) id: number,
    @Args('input') input: UpdateKisteInput,
  ): Promise<Kiste> {
    return this.kistenService.update(id, input);
  }
}
