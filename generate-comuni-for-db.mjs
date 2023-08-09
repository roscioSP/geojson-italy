import * as fs from 'fs/promises';

const jsonData = await fs.readFile('./geojson/limits_IT_municipalities.geojson', 'utf-8');

const data = JSON.parse(jsonData);
const comuniSource = data.features;
const comuni = comuniSource
    .map(xx => {
        return {
            name: xx.properties.name,
            istat: xx.properties.com_istat_code,
            catasto: xx.properties.com_catasto_code,
            istat_num: xx.properties.com_istat_code_num
        }
    });

const jsonComuni = JSON.stringify(comuni);

await fs.writeFile('./comuni-for-db.json',  jsonComuni);