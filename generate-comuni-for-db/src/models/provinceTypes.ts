import { Geometry } from "./commonTypes"

export type Properties = {
    prov_name: string,
    prov_istat_code_num: number,
    prov_acr: string,
    reg_name: string,
    reg_istat_code: string,
    reg_istat_code_num: number,
    prov_istat_code: string
}

export type Feature = {
    type: string,
    geometry: Geometry,
    properties: Properties
}

export type Data = {
    type: string,
    bbox: number[],
    features: Feature[]
}

export type ProvinceForDb = {
    Name: string,
    Istat: number,
    RegionIstat: number
}