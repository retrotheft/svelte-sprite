import { createContext } from "svelte";
import { type SceneContext } from "$lib/types/index.js";

export const [ getSceneContext, setSceneContext ] = createContext<SceneContext>()
