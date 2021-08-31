import { Kiste } from '@prisma/client';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { DateTime } from 'luxon';
import { Context } from '../context';
import { hasWriteAccess } from '../utils';

export async function addKiste(
  parent: any,
  args: any,
  context: Context,
  info: any
) {
  if (!(await hasWriteAccess(context))) {
    throw new AuthenticationError(
      'Diese Operation ist nur mit Anmeldung ausführbar!'
    );
  }

  const packeGegenstaendeInKiste: any[] = args.input.gegenstaende
    ? args.input.gegenstaende
    : undefined;

  return await context.prisma.kiste.create({
    data: {
      name: args.input.name,
      beschreibung: args.input.beschreibung,
      gegenstaendeInKiste: {
        create: packeGegenstaendeInKiste,
      },
      lagerort: args.input.lagerort,
    },
  });
}

export async function addGegenstand(
  parent: any,
  args: any,
  context: Context,
  info: any
) {
  if (!(await hasWriteAccess(context))) {
    throw new AuthenticationError(
      'Diese Operation ist nur mit Anmeldung ausführbar!'
    );
  }

  if (!args.input?.kiste && !args.input?.kisteID) {
    throw new UserInputError(
      'Benötige Angaben zu einer Kiste! Entweder die ID einer bestehenden Kiste oder die notwendigen Angaben zum erzeugen einer neuen Kiste!'
    );
  }

  let kisteID = args.input.kisteID ? parseInt(args.input.kisteID) : -1;
  let kiste =
    kisteID !== -1
      ? await context.prisma.kiste.findUnique({ where: { id: kisteID } })
      : args.input.kiste;

  return await context.prisma.gegenstand.create({
    data: {
      name: args.input.name,
      beschreibung: args.input.beschreibung,
      istInKiste: {
        connectOrCreate: {
          where: { id: kisteID },
          create: kiste,
        },
      },
      anzahl: args.input.anzahl,
      bild: args.input.bild,
    },
  });
}

export async function deleteKiste(
  parent: any,
  args: any,
  context: Context,
  info: any
) {
  if (!(await hasWriteAccess(context))) {
    throw new AuthenticationError(
      'Diese Operation ist nur mit Anmeldung ausführbar!'
    );
  }

  return await context.prisma.kiste.delete({
    where: { id: parseInt(args.id) },
    include: { gegenstaendeInKiste: true },
  });
}

export async function deleteGegenstand(
  parent: any,
  args: any,
  context: Context,
  info: any
) {
  if (!(await hasWriteAccess(context))) {
    throw new AuthenticationError(
      'Diese Operation ist nur mit Anmeldung ausführbar!'
    );
  }

  return await context.prisma.gegenstand.delete({
    where: {
      id: parseInt(args.id),
    },
  });
}

export async function updateKiste(
  parent: any,
  args: any,
  context: Context,
  info: any
) {
  if (!(await hasWriteAccess(context))) {
    throw new AuthenticationError(
      'Diese Operation ist nur mit Anmeldung ausführbar!'
    );
  }

  const packeGegenstaendeInKiste: any[] = args.input.gegenstaende
    ? args.input.gegenstaende
    : undefined;

  return await context.prisma.kiste.update({
    where: { id: parseInt(args.id) },
    data: {
      name: args.input.name,
      beschreibung: args.input.beschreibung,
      gegenstaendeInKiste: { create: packeGegenstaendeInKiste },
      lagerort: args.input.lagerort,
      letzteInventur: DateTime.now().toISO(),
    },
  });
}

export async function updateGegenstand(
  parent: any,
  args: any,
  context: Context,
  info: any
) {
  if (!(await hasWriteAccess(context))) {
    throw new AuthenticationError(
      'Diese Operation ist nur mit Anmeldung ausführbar!'
    );
  }

  let kiste: Kiste | null = null;

  if (args.input.kisteID) {
    kiste = await context.prisma.kiste.findFirst({
      where: { id: parseInt(args.input.kisteID) },
    });

    return await context.prisma.gegenstand.update({
      where: { id: parseInt(args.id) },
      data: {
        name: args.input.name,
        anzahl: args.input.anzahl,
        beschreibung: args.input.beschreibung,
        bild: args.input.bild,
        istInKiste: { connect: { id: parseInt(args.input.kisteID) } },
        letzteInventur: DateTime.now().toISO(),
      },
    });
  }

  const packeInKiste: any = args.input.kisteNeu
    ? args.input.kisteNeu
    : undefined;

  return await context.prisma.gegenstand.update({
    where: { id: parseInt(args.id) },
    data: {
      name: args.input.name,
      beschreibung: args.input.beschreibung,
      istInKiste: {
        create: packeInKiste,
      },
      anzahl: args.input.anzahl,
      bild: args.input.bild,
      letzteInventur: DateTime.now().toISO(),
    },
  });
}
