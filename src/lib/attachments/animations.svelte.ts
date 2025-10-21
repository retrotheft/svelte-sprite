type AnimationHook = (e: AnimationEvent) => void

type Hooks = {
   [key: string]: {
      start?: AnimationHook,
      end?: AnimationHook,
      cancel?: AnimationHook,
      iterate?: AnimationHook
   }
}

type Handlers = {
   onanimationstart?: (e: AnimationEvent) => void
   onanimationend?: (e: AnimationEvent) => void
   onanimationcancel?: (e: AnimationEvent) => void
   onanimationiteration?: (e: AnimationEvent) => void
}

export function createAnimationHandler(hooks: Hooks): Handlers {
   const handlers: Handlers = {}

   handlers.onanimationstart = e => hooks[e.animationName]?.start?.(e)
   handlers.onanimationend = e => hooks[e.animationName]?.end?.(e)
   handlers.onanimationiteration = e => hooks[e.animationName]?.iterate?.(e)
   handlers.onanimationcancel = e => hooks[e.animationName]?.cancel?.(e)

   return handlers
}
