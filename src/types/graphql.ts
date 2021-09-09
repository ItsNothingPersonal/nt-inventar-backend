
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Sort {
    asc = "asc",
    desc = "desc"
}

export enum Lagerort {
    KUNO = "KUNO",
    PELLERHAUS = "PELLERHAUS",
    FUNDUS = "FUNDUS"
}

export interface GegenstandOrderByInput {
    name?: Nullable<Sort>;
    beschreibung?: Nullable<Sort>;
    anzahl?: Nullable<Sort>;
    bild?: Nullable<Sort>;
    hinzugefuegt?: Nullable<Sort>;
    letzteInventur?: Nullable<Sort>;
}

export interface AddGegenstandInput {
    name: string;
    beschreibung?: Nullable<string>;
    anzahl: number;
    bild?: Nullable<string>;
    kisteID?: Nullable<number>;
    kiste?: Nullable<AddKisteFuerGegenstandInput>;
}

export interface AddKisteFuerGegenstandInput {
    name: string;
    beschreibung?: Nullable<string>;
    lagerort: Lagerort;
}

export interface UpdateGegenstandInput {
    name?: Nullable<string>;
    beschreibung?: Nullable<string>;
    anzahl?: Nullable<number>;
    bild?: Nullable<string>;
    kisteID?: Nullable<number>;
    kisteNeu?: Nullable<AddKisteInput>;
}

export interface UpdateAddGegenstandInput {
    name: string;
    beschreibung?: Nullable<string>;
    anzahl: number;
    bild?: Nullable<string>;
}

export interface KisteOrderByInput {
    name?: Nullable<Sort>;
    beschreibung?: Nullable<Sort>;
    lagerort?: Nullable<Sort>;
    hinzugefuegt?: Nullable<Sort>;
    letzteInventur?: Nullable<Sort>;
}

export interface AddKisteInput {
    name: string;
    beschreibung?: Nullable<string>;
    gegenstaende?: Nullable<AddGegenstandInput[]>;
    lagerort: Lagerort;
}

export interface UpdateKisteInput {
    name?: Nullable<string>;
    beschreibung?: Nullable<string>;
    gegenstaende?: Nullable<UpdateAddGegenstandInput[]>;
    lagerort?: Nullable<Lagerort>;
}

export interface IQuery {
    __typename?: 'IQuery';
    gegenstandById(id: number): Nullable<Gegenstand> | Promise<Nullable<Gegenstand>>;
    alleGegenstaende(filter?: Nullable<string>, skip?: Nullable<number>, take?: Nullable<number>, orderBy?: Nullable<GegenstandOrderByInput>): Nullable<Gegenstand>[] | Promise<Nullable<Gegenstand>[]>;
    kisteById(id: number): Nullable<Kiste> | Promise<Nullable<Kiste>>;
    alleKisten(filter?: Nullable<string>, skip?: Nullable<number>, take?: Nullable<number>, orderBy?: Nullable<KisteOrderByInput>): Nullable<Kiste>[] | Promise<Nullable<Kiste>[]>;
}

export interface IMutation {
    __typename?: 'IMutation';
    addGegenstand(input?: Nullable<AddGegenstandInput>): Nullable<Gegenstand> | Promise<Nullable<Gegenstand>>;
    deleteGegenstand(id: number): Nullable<DeleteGegenstand> | Promise<Nullable<DeleteGegenstand>>;
    updateGegenstand(id: number, input?: Nullable<UpdateGegenstandInput>): Nullable<Gegenstand> | Promise<Nullable<Gegenstand>>;
    addKiste(input?: Nullable<AddKisteInput>): Nullable<Kiste> | Promise<Nullable<Kiste>>;
    deleteKiste(id: number): Nullable<DeleteKiste> | Promise<Nullable<DeleteKiste>>;
    updateKiste(id: number, input?: Nullable<UpdateKisteInput>): Nullable<Kiste> | Promise<Nullable<Kiste>>;
}

export interface Gegenstand {
    __typename?: 'Gegenstand';
    id: number;
    name: string;
    beschreibung?: Nullable<string>;
    anzahl: number;
    bild?: Nullable<string>;
    istInKiste: Kiste;
    hinzugefuegt: DateTime;
    letzteInventur: DateTime;
}

export interface DeleteGegenstand {
    __typename?: 'DeleteGegenstand';
    id: number;
    name: string;
    beschreibung?: Nullable<string>;
    anzahl: number;
    bild?: Nullable<string>;
    hinzugefuegt: DateTime;
    letzteInventur: DateTime;
}

export interface Kiste {
    __typename?: 'Kiste';
    id: number;
    name: string;
    beschreibung?: Nullable<string>;
    gegenstaendeInKiste?: Nullable<Gegenstand[]>;
    lagerort: Lagerort;
    hinzugefuegt: DateTime;
    letzteInventur: DateTime;
}

export interface DeleteKiste {
    __typename?: 'DeleteKiste';
    id: number;
    name: string;
    beschreibung?: Nullable<string>;
    gegenstaendeInKiste?: Nullable<Gegenstand[]>;
    lagerort: Lagerort;
    hinzugefuegt: DateTime;
    letzteInventur: DateTime;
}

export type DateTime = Date;
type Nullable<T> = T | null;
