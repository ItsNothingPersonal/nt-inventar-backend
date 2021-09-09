import { Injectable } from '@nestjs/common';
import { Gegenstand, Kiste } from '@prisma/client';
import { PrismaService } from '@src/prisma.service';
import {
  AddGegenstandInput,
  AddKisteFuerGegenstandInput,
  GegenstandOrderByInput,
  UpdateGegenstandInput,
} from '@src/types/graphql';
import { DateTime } from 'luxon';

@Injectable()
export class GegenstaendeService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(
    filter: string,
    skip: number,
    take: number,
    orderBy: GegenstandOrderByInput,
  ): Promise<Gegenstand[]> {
    const where = filter
      ? {
          OR: [
            { name: { contains: filter } },
            { beschreibung: { contains: filter } },
            { bild: { contains: filter } },
          ],
        }
      : {};

    return this.prisma.gegenstand.findMany({
      where,
      skip,
      take,
      orderBy,
    });
  }

  async findUniqueById(id: number): Promise<Gegenstand> {
    return this.prisma.gegenstand.findFirst({
      where: { id },
    });
  }

  async create(
    input: AddGegenstandInput,
    kisteID: number,
    kiste: Kiste | AddKisteFuerGegenstandInput,
  ): Promise<Gegenstand> {
    return await this.prisma.gegenstand.create({
      data: {
        name: input.name,
        beschreibung: input.beschreibung,
        istInKiste: {
          connectOrCreate: {
            where: { id: kisteID },
            create: kiste,
          },
        },
        anzahl: input.anzahl,
        bild: input.bild,
      },
    });
  }

  async delete(id: number): Promise<Gegenstand> {
    return this.prisma.gegenstand.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, input: UpdateGegenstandInput): Promise<Gegenstand> {
    if (input.kisteID) {
      return this.prisma.gegenstand.update({
        where: { id },
        data: {
          name: input.name,
          anzahl: input.anzahl,
          beschreibung: input.beschreibung,
          bild: input.bild,
          istInKiste: {
            connect: { id: input.kisteID },
          },
          letzteInventur: DateTime.now().toISO(),
        },
      });
    }

    return await this.prisma.gegenstand.update({
      where: { id },
      data: {
        name: input.name,
        beschreibung: input.beschreibung,
        istInKiste: {
          create: input.kisteNeu ? input.kisteNeu : undefined,
        },
        anzahl: input.anzahl,
        bild: input.bild,
        letzteInventur: DateTime.now().toISO(),
      },
    });
  }

  async findManyGegenstaendeInKiste(istInKiste: Kiste): Promise<Gegenstand[]> {
    return this.prisma.gegenstand.findMany({
      where: { istInKiste },
    });
  }
}
