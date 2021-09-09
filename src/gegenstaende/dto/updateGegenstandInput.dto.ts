import { AddKisteInput, UpdateGegenstandInput } from '@src/types/graphql';
import { Type } from 'class-transformer';

export class UpdateGegenstandInputDTO implements UpdateGegenstandInput {
  name?: string;
  beschreibung?: string;
  anzahl?: number;
  bild?: string;
  @Type(() => Number)
  kisteID?: number;
  kisteNeu?: AddKisteInput;
}
