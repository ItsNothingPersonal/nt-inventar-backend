import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/types/graphql.ts'),
  emitTypenameField: true,
  outputAs: 'interface',
  defaultScalarType: 'unknown',
  customScalarTypeMapping: {
    DateTime: 'Date',
  },
  defaultTypeMapping: {
    ID: 'number',
  },
});
