import fs from 'fs'
import path from 'path'

const geojsonFolder = './src/assets/geojson/'

export const getRoute = (name: string) => {
    var fileName = name
    console.log('Serving filename : ', fileName)

    var filenameComplete = geojsonFolder + fileName + '.json'
    const jsonData = fs.readFileSync(filenameComplete, 'utf8')

    return jsonData
}

export const getAvailableRouteNames = () => {
    const files = fs.readdirSync(geojsonFolder)
    const geoJSONFiles = files.filter(file => path.extname(file) === '.json')
    return geoJSONFiles.map(file => path.basename(file, '.json'))
}