import { Context } from '../context';

export function gegenstaendeInKiste(parent: any, args: any, context: Context) {
  return context.prisma.kiste
    .findUnique({ where: { id: parent.id } })
    .gegenstaendeInKiste();
}
