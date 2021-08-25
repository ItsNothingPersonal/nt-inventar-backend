import { Context } from '../context';

export function istInKiste(parent: any, args: any, context: Context) {
  return context.prisma.gegenstand
    .findUnique({
      where: { id: parent.id },
    })
    .istInKiste();
}
