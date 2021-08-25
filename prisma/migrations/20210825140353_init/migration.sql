-- CreateTable
CREATE TABLE "Gegenstand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "beschreibung" TEXT,
    "anzahl" INTEGER NOT NULL,
    "bild" TEXT,
    "istInKisteById" INTEGER NOT NULL,
    "hinzugefuegt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "letzteInventur" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("istInKisteById") REFERENCES "Kiste" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Kiste" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "beschreibung" TEXT,
    "lagerort" TEXT NOT NULL,
    "hinzugefuegt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "letzteInventur" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Gegenstand.name_unique" ON "Gegenstand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Kiste.name_unique" ON "Kiste"("name");
