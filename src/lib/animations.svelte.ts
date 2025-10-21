type StatesWithFrames = Record<string, number>

type AnimationHook = (e: AnimationEvent, frames: number) => void

type HookConfig = {
   start?: AnimationHook,
   end?: AnimationHook,
   cancel?: AnimationHook,
   iterate?: AnimationHook
}

type Hooks<T extends StatesWithFrames> = {
   [K in keyof T]?: HookConfig
}

type Handlers = {
   onanimationstart?: (e: AnimationEvent) => void
   onanimationend?: (e: AnimationEvent) => void
   onanimationcancel?: (e: AnimationEvent) => void
   onanimationiteration?: (e: AnimationEvent) => void
}

export function createAnimationHandler<const T extends StatesWithFrames>(
   statesWithFrames: T,
   hooks: Hooks<T>
): Handlers {
   type State = keyof T & string

   const handlers: Handlers = {}
   handlers.onanimationstart = e => {
      const state = e.animationName as State
      const frames = statesWithFrames[state]
      hooks[state]?.start?.(e, frames)
   }
   handlers.onanimationend = e => {
      const state = e.animationName as State
      const frames = statesWithFrames[state]
      hooks[state]?.end?.(e, frames)
   }
   handlers.onanimationiteration = e => {
      const state = e.animationName as State
      const frames = statesWithFrames[state]
      hooks[state]?.iterate?.(e, frames)
   }
   handlers.onanimationcancel = e => {
      const state = e.animationName as State
      const frames = statesWithFrames[state]
      hooks[state]?.cancel?.(e, frames)
   }
   return handlers
}
