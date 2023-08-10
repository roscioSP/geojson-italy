import * as fs from 'fs/promises';
import {Data as ComuniData, ComuneForDb} from './models/comuniTypes';
import {Data as ProvinceData, ProvinceForDb} from './models/provinceTypes';

class Index {
    static async exportCities(): Promise<void> {
        const jsonData: string = await fs.readFile('../geojson/limits_IT_municipalities.geojson', 'utf-8');

        const data: ComuniData = JSON.parse(jsonData);
        const comuni = data.features
            .map(comune => {
                return {
                    Name: comune.properties.name,
                    Istat: comune.properties.com_istat_code_num,
                    Fisco: comune.properties.com_catasto_code,
                    Province: comune.properties.prov_acr,
                    RegionIstat: comune.properties.reg_istat_code_num
                } as ComuneForDb;
            });

        const jsonComuni = JSON.stringify(comuni);

        await fs.writeFile('./CitiesSource.json',  jsonComuni);
    }

    static async exportProvinces(): Promise<void> {
        const jsonData: string = await fs.readFile('../geojson/limits_IT_provinces.geojson', 'utf-8');

        const data: ProvinceData = JSON.parse(jsonData);
        const comuni = data.features
            .map(province => {
                return {
                    Name: province.properties.prov_name,
                    Istat: province.properties.prov_istat_code_num,
                    RegionIstat: province.properties.reg_istat_code_num,
                    Code: province.properties.prov_acr
                } as ProvinceForDb;
            });

        const jsonComuni = JSON.stringify(comuni);

        await fs.writeFile('./ProvincesSource.json',  jsonComuni);
    }
}

Index.exportCities();
Index.exportProvinces();

export default Index;