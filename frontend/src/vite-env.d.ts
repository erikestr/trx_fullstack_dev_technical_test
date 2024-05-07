/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GMAPS_API: string,
    readonly VITE_GMAPS_MAPID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}