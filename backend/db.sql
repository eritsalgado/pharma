CREATE DATABASE IF NOT EXISTS pharma_db;
USE pharma_db;

CREATE TABLE usuarios(
    id          int(255) auto_increment not null,
    nombre      varchar(255),
    email       varchar(255),
    password    varchar(255),
    rango       int(255),
    created_at datetime DEFAULT NULL,
    updated_at datetime DEFAULT NULL,
    CONSTRAINT pk_usuario PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE muestras(
    id                  int(255) auto_increment not null,
    codigo              varchar(255),
    folio               varchar(255),
    fecha_muestra       date,
    nombre              varchar(255),
    fecha_nac           date,
    edad                int(10),
    genero              varchar(10),
    vida_sexual         varchar(2),
    tipo_estudio        varchar(255),
    fecha_ult_rev       date,
    nombre_medico       varchar(255),
    vph_16              varchar(255),
    vph_18              varchar(255),
    vph_ar              varchar(255),
    ciclo_corte         float(10,2),
    resp_pro_adn        varchar(255),
    fecha_emision       date,
    marcador            varchar(255),
    muestra             varchar(255),
    tipo_de_muestra     varchar(255),
    dias                varchar(255),
    calculo             float(10,2),
    created_at datetime DEFAULT NULL,
    updated_at datetime DEFAULT NULL,
    CONSTRAINT pk_muestra PRIMARY KEY(id)
)ENGINE=InnoDb;