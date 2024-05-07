/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GMAPS_API: string,
    readonly VITE_GMAPS_MAPID: string,
    readonly VITE_API_SERVER: string
    readonly VITE_WS_SERVER: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}