import { Geometry } from "./commonTypes"

export type CrsProps = {
    name: string
}

export type Crs = {
    type: string,
    properties: CrsProps
}

export type FeatureProps = {
    name: string,
    op_id: string,
    minint_elettorale: string,
    minint_finloc: string,
    prov_name: string,
    prov_istat_code: string,
    prov_istat_code_num: number,
    prov_acr: string,
    reg_name: string,
    reg_istat_code: string,
    reg_istat_code_num: number,
    opdm_id: string,
    com_catasto_code: string,
    com_istat_code: string,
    com_istat_code_num: number
}

export type Feature = {
    type: string,
    properties: FeatureProps,
    geometry: Geometry
}

export type Data = {
    type: string,
    crs: Crs,
    features: Feature[]
};

export type ComuneForDb = {
    Name: string,
    Istat: number,
    Fisco: string,
    RegionIstat: number,
    Province: string
}