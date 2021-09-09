import { Injectable } from '@nestjs/common';
import { Kiste } from '@prisma/client';
import { PrismaService } from '@src/prisma.service';
import {
  AddKisteInput,
  KisteOrderByInput,
  UpdateKisteInput,
} from '@src/types/graphql';
import { DateTime } from 'luxon';

@Injectable()
export class KistenService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(
    filter: string,
    skip: number,
    take: number,
    orderBy: KisteOrderByInput,
  ): Promise<Kiste[]> {
    const where = filter
      ? {
          OR: [
            { name: { contains: filter } },
            { beschreibung: { contains: filter } },
            { bild: { contains: filter } },
          ],
        }
      : {};

    return this.prisma.kiste.findMany({
      where,
      skip,
      take,
      orderBy,
    });
  }

  async findUniqueById(id: number): Promise<Kiste> {
    return this.prisma.kiste.findUnique({ where: { id: id } });
  }

  async create(input: AddKisteInput): Promise<Kiste> {
    return await this.prisma.kiste.create({
      data: {
        name: input.name,
        beschreibung: input.beschreibung,
        gegenstaendeInKiste: {
          create: input.gegenstaende ? input.gegenstaende : undefined,
        },
        lagerort: input.lagerort,
      },
    });
  }

  async delete(id: number): Promise<Kiste> {
    return this.prisma.kiste.delete({
      where: { id },
      include: { gegenstaendeInKiste: true },
    });
  }

  async update(id: number, input: UpdateKisteInput): Promise<Kiste> {
    return await this.prisma.kiste.update({
      where: { id: id },
      data: {
        name: input.name,
        beschreibung: input.beschreibung,
        gegenstaendeInKiste: {
          create: input.gegenstaende ? input.gegenstaende : undefined,
        },
        lagerort: input.lagerort,
        letzteInventur: DateTime.now().toISO(),
      },
    });
  }

  async findUniqueByGegenstandId(gegenstandId: number): Promise<Kiste> {
    return this.prisma.kiste.findFirst({
      where: { gegenstaendeInKiste: { some: { id: gegenstandId } } },
    });
  }
}
