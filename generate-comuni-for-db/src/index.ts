import * as fs from 'fs/promises';
import {Data, Feature, ComuneForDb} from './models/types';

class Index {
    static async start():  Promise<any> {
        const jsonData: string = await fs.readFile('../geojson/limits_IT_municipalities.geojson', 'utf-8');

        const data: Data = JSON.parse(jsonData);
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

        await fs.writeFile('./comuni-for-db.json',  jsonComuni);
    }
}

Index.start();

export default Index;