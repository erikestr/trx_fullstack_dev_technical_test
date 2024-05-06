import { admin } from "../../config/firebase"
const db = admin.firestore()

export const getPaginatedVehicles = async (pageSize: number, startAfterDoc?: string) => {
    console.log(startAfterDoc)
    let query = db
        .collection('vehicles')
        .orderBy('vim')
        .limit(pageSize)

    if (startAfterDoc) {
        const newQuery = await db
            .collection('vehicles')
            .doc(startAfterDoc)
            .get()

        if (newQuery.exists) {
            query = query.startAfter(newQuery)
        } else {
            console.error(`Document with id ${startAfterDoc} does not exist.`)
        }
    }

    const snapshot = await query.get()
    const items = snapshot.docs.map(doc => doc.data())

    return items
}
export const getPaginatedVehiclesByPageNumber = async (pageSize: number, pageNumber: number) => {
    let query = db
        .collection('vehicles')
        .orderBy('sys_row_id')
        .limit(pageSize)

    console.log(pageSize, pageNumber)


    if (pageNumber > 1) {
        console.log(pageSize, pageNumber)

        query = query.startAfter((pageNumber - 1) * pageSize)
    }

    const snapshot = await query.get()
    const items = snapshot.docs.map(doc => doc.data())

    return items
}

export const getTotalVehicles = async (): Promise<number> => {
    const snapshot = await db
        .collection('vehicles')
        .get()
    return snapshot.size
}

export const addVehicle = async (vehicle: any) => {
    const collectionRef = db.collection('vehicles');
    const lastDoc = await collectionRef.orderBy('sys_row_id', 'desc').limit(1).get();
    let lastId = 0;

    if (!lastDoc.empty) {
        lastId = parseInt(lastDoc.docs[0].id) + 1;
    }
    else
        lastId++

    vehicle.sys_row_created = Date.now()
    vehicle.sys_row_id = lastId
    return await admin
        .firestore()
        .collection('vehicles')
        .doc(lastId.toString())
        .set(vehicle)
        .then(() => {
            console.log('Added document with ID: ', lastId.toString())
            return lastId.toString()
        })
}

export const getLastId = async () => {
    return await db
        .collection('vehicles')
        .orderBy('sys_row_id', 'desc')
        .limit(1)
        .get()
        .then(async snapshot => {
            if (snapshot.empty) {
                console.log('No documents found.')
                return null
            } else {
                return await snapshot.docs[0].data()
            }
        })
        .catch(error => {
            console.error('Error getting documents: ', error)
            throw error
        })
}

export const bulkVehicles = async (vehicles: any[]) => {
    const batch = db.batch();
    const collectionRef = db.collection('vehicles');

    try {
        const lastDoc = await collectionRef.orderBy('sys_row_id', 'desc').limit(1).get();
        let lastId = 0;

        if (!lastDoc.empty) {
            lastId = parseInt(lastDoc.docs[0].id) + 1;
        }
        else
            lastId++
        vehicles.forEach(data => {
            data.sys_row_created = Date.now();
            data.sys_row_id = lastId;
            const docRef = collectionRef.doc(lastId.toString());
            batch.set(docRef, data);
            lastId++;
        });

        await batch.commit();

        console.log('Documentos insertados correctamente.');
    } catch (error) {
        console.error('Error al insertar documentos:', error);
    }
}