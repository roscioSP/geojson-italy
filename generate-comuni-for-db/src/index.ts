import * as fs from 'fs/promises';

type CrsProps = {
    name: string
}

type Crs = {
    type: string,
    properties: CrsProps
}

type FeatureProps = {
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

type Coordinates = number[][];

type Geometry = {
    type: string,
    coordinates: Coordinates
}

type Feature = {
    type: string,
    properties: FeatureProps,
    geometry: Geometry
}

type Data = {
    type: string,
    crs: Crs,
    features: Feature[]
};

type ComuneForDb = {
    name: string,
    istat: number,
    fisco: number
}

class Index {
    static async start():  Promise<any> {
        const jsonData = await fs.readFile('../geojson/limits_IT_municipalities.geojson', 'utf-8');

        const data: Data = JSON.parse(jsonData);
        const comuniSource: Feature[] = data.features;
        const comuni = comuniSource
            .map(xx => {
                return {
                    name: xx.properties.name,
                    istat: xx.properties.com_istat_code_num,
                    fisco: xx.properties.com_catasto_code
                } as unknown as ComuneForDb;
            });

        const jsonComuni = JSON.stringify(comuni);

        await fs.writeFile('./comuni-for-db.json',  jsonComuni);
    }
}

Index.start();

export default Index;