import { createContext } from "svelte";

interface SceneContext {
   FRAME_DURATION: number
}

export const [ getSceneContext, setSceneContext ] = createContext<SceneContext>()
