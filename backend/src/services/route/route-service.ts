import path from 'path'
import fs from 'fs'

const geojsonFolder = './../../assets/geojson/'

export const getRoute = (name: string) => {
    var fileName = name
    console.log('Serving filename : ', fileName)

    var filenameComplete =
        path.join(__dirname, geojsonFolder) + fileName + '.json'
    const jsonData = fs.readFileSync(filenameComplete, 'utf8');

    return jsonData
};
