import { useLoader } from "@react-three/fiber"

import {
  EquirectangularReflectionMapping,
  CubeTextureLoader,
  Texture,
  Loader,
  CubeReflectionMapping,
  CubeTexture,
  sRGBEncoding,
  LinearEncoding,
  TextureEncoding,
} from "three"

import { RGBELoader } from "three-stdlib"

import { presetsObj, PresetsType } from "./getEnvironmentAssets"

const CUBEMAP_ROOT = "https://cdn.storybrain.com/template-assets/"

export type EnvironmentLoaderProps = {
  files?: string | string[]
  path?: string
  preset?: PresetsType
  extensions?: (loader: Loader) => void
  encoding?: TextureEncoding
  onLoaded?: () => void
}

export function useEnvironment({
  files = ["/px.png", "/nx.png", "/py.png", "/ny.png", "/pz.png", "/nz.png"],
  path = "",
  preset = undefined,
  encoding = undefined,
  onLoaded,
  extensions,
}: Partial<EnvironmentLoaderProps> = {}) {
  if (preset) {
    if (!(preset in presetsObj))
      throw new Error(
        "Preset must be one of: " + Object.keys(presetsObj).join(", ")
      )
    files = presetsObj[preset]
    path = CUBEMAP_ROOT
  }

  const isCubeMap = Array.isArray(files)
  const loader = isCubeMap ? CubeTextureLoader : RGBELoader
  const loaderResult: Texture | Texture[] = useLoader(
    // @ts-expect-error
    loader,
    isCubeMap ? [files] : files,
    loader => {
      loader.setPath(path)
      if (extensions) extensions(loader)
      loader.manager.onLoad = () => {
        console.log("hdr loaded successfully")
        if (onLoaded) onLoaded()
      }
    }
  )
  const texture: Texture | CubeTexture = isCubeMap
    ? // @ts-ignore
      loaderResult[0]
    : loaderResult
  texture.mapping = isCubeMap
    ? CubeReflectionMapping
    : EquirectangularReflectionMapping
  texture.encoding = (encoding ?? isCubeMap) ? sRGBEncoding : LinearEncoding
  return texture
}
