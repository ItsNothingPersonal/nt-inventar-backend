import {
  AddGegenstandInput,
  AddKisteFuerGegenstandInput,
} from '@src/types/graphql';
import { Type } from 'class-transformer';

export class AddGegenstandInputDto implements AddGegenstandInput {
  name: string;
  beschreibung?: string;
  anzahl: number;
  bild?: string;
  @Type(() => Number)
  kisteID?: number;
  kiste?: AddKisteFuerGegenstandInput;
}
