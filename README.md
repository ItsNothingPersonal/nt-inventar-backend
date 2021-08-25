# NT-Inventar-Backend

Der GraphQL-Server für das Inventar-Projekt des [Nächtlichen Theaters](https://www.naechtlichestheater.de)

## Installation

Wie folgt vorgehen um das Projekt einzurichten

1. Erstellung einer .env-Datei im Projekt-Verzeichnis mit folgenden Werten
```bash
NODE_ENV=
DATABASE_URL=
PORT=
JWKS_URI=
AUTH_PUBLIC_KEY_KID =
SECRET=
CLIENT_ID=
BASE_URL=
ISSUER_BASE_URL=
AUTH0_AUDIENCE=
```
Informationen zu diesen Schlüsseln gibt es, sofern notwendig, bei Sebastian.

2. In ./prisma/schema.prisma ggfs. den Provider anpassen
```javascript
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

3. Abhängigkeiten installieren
```bash
yarn install
```
4. Prisma Schema in die Datenbank einspielen
```bash
yarn prisma migrate dev
```

## Benutzung
```bash
# starten im Entwicklungsmodus
yarn run start:dev

# Projekt bauen
yarn run build

# starten des gebauten Projekts
yarn run start

# Prisma Studio starten
yarn run prisma:studio
```

## Beiträge
Pull-Requests sind immer, ebenso wie generelle Hinweise, willkommen.

## Unterstützung
Für Unterstützung entweder auf Github einen "Issue" erstellen oder eine PN via Forum/Discord an Sebastian schicken.

## Links
[GraphQL](https://graphql.org)
[Prisma](https://www.prisma.io)
[Apollo Server](https://www.apollographql.com)

## Lizenz
[GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)
