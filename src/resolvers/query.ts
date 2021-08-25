import { Context } from '../context';

export async function alleGegenstaende(
  parent: any,
  args: any,
  context: Context,
  info: any
) {
  const where = args.filter
    ? {
        OR: [
          { name: { contains: args.filter } },
          { beschreibung: { contains: args.filter } },
          { bild: { contains: args.filter } },
        ],
      }
    : {};

  return await context.prisma.gegenstand.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
}

export async function gegenstandById(
  parent: any,
  args: any,
  context: Context,
  info: any
) {
  return await context.prisma.gegenstand.findFirst({
    where: { id: parseInt(args.id) },
  });
}

export async function alleKisten(
  parent: any,
  args: any,
  context: Context,
  info: any
) {
  const where = args.filter
    ? {
        OR: [
          { name: { contains: args.filter } },
          { beschreibung: { contains: args.filter } },
          { lagerort: { equals: args.filter } },
        ],
      }
    : {};

  return await context.prisma.kiste.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
}

export async function kisteById(
  parent: any,
  args: any,
  context: Context,
  info: any
) {
  return await context.prisma.kiste.findFirst({
    where: { id: parseInt(args.id) },
  });
}
