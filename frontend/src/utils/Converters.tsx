export const blobToString = (blob: any): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result)
            } else {
                reject(new Error('Failed to convert Blob to string'))
            }
        }
        reader.onerror = () => {
            reject(new Error('Error reading Blob as string'))
        }
        reader.readAsText(blob)
    })
}