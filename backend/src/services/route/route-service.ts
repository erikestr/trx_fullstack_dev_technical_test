import fs from 'fs'

const geojsonFolder = './src/assets/geojson/'

export const getRoute = (name: string) => {
    var fileName = name
    console.log('Serving filename : ', fileName)

    var filenameComplete = geojsonFolder + fileName + '.json'
    const jsonData = fs.readFileSync(filenameComplete, 'utf8');

    return jsonData
};
