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
yarn prisma deploy
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

## Hinweis zu mysql unter Windows
Bei der Einrichtung von mysql unter Windows unbedingt darauf achten, das in der my.ini der folgende Wert gesetzt ist:
```ini
lower_case_table_names=2
```
Defaultmäßig steht dieser Wert auf 1, was dazu führt das Prisma Tabellen Migrationsstatements mit kleingeschriebenen Tabellennamen erzeugt und diese auf einem Linux basierten DB-Host nicht funktionieren!
Weitere Infos in der offiziellen [mysql-Doku](https://dev.mysql.com/doc/refman/8.0/en/identifier-case-sensitivity.html)

## Beiträge
Pull-Requests sind immer, ebenso wie generelle Hinweise, willkommen.

## Unterstützung
Für Unterstützung entweder auf Github einen "Issue" erstellen oder eine PN via Forum/Discord an Sebastian schicken.

## Links
[GraphQL](https://graphql.org)
[NestJS](https://nestjs.com)
[Prisma](https://www.prisma.io)
[Apollo Server](https://www.apollographql.com)

## Lizenz
[GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)
