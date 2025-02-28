#!/bin/sh

set -o errexit
set -o nounset

IFS='
	 '

CDPATH= cd -- "$(dirname -- "$0")"

cp comuni.geojson geojson/limits_IT_municipalities.geojson

mapshaper \
    -i geojson/limits_IT_municipalities.geojson -clean encoding=utf8 \
    -rename-layers municipalities \
    -dissolve prov_istat_code + \
      copy-fields=prov_name,prov_istat_code_num,prov_acr,reg_name,reg_istat_code,reg_istat_code_num name=provinces \
    -target 1 \
    -dissolve reg_istat_code + \
      copy-fields=reg_name,reg_istat_code_num name=regions \
    -target 1  \
    -o geojson/limits_IT_provinces.geojson bbox gj2008 format=geojson target=provinces \
    -o geojson/limits_IT_regions.geojson bbox gj2008 format=geojson target=regions

for REG in $(seq 1 20)
do
  mapshaper \
    -i geojson/provinces-by-region/limits_IT_provinces.geojson -clean encoding=utf8 \
    -filter reg_istat_code_num==$REG \
    -o geojson/${REG}.geojson bbox format=geojson gj2008
done

for PROV in $(seq 1 111)
do
  mapshaper \
    -i geojson/limits_IT_municipalities.geojson -clean encoding=utf8 \
    -filter prov_istat_code_num==$PROV \
    -o geojson/municipalities-by-province/${PROV}.geojson bbox format=geojson gj2008
done

