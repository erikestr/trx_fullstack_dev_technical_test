import MapViewer from '../molecules/MapViewer';

export default function MapController() {
    return (
        <div className='w-auto h-full flex flex-col p-4'>
            <p className='text-2xl my-2'>Route</p>
            <MapViewer/>
        </div>
    )
}