type AnimationHook = (e: AnimationEvent) => void

type HookConfig = {
   start?: AnimationHook,
   end?: AnimationHook,
   cancel?: AnimationHook,
   iterate?: AnimationHook
}

type Hooks<T extends readonly string[]> = {
   [K in T[number]]?: HookConfig
}

type Handlers = {
   onanimationstart?: (e: AnimationEvent) => void
   onanimationend?: (e: AnimationEvent) => void
   onanimationcancel?: (e: AnimationEvent) => void
   onanimationiteration?: (e: AnimationEvent) => void
}

export function createAnimationHandler<const T extends readonly string[]>(
   states: T, hooks: Hooks<T>): Handlers {
   const handlers: Handlers = {}

   handlers.onanimationstart = e => hooks[e.animationName as T[number]]?.start?.(e)
   handlers.onanimationend = e => hooks[e.animationName as T[number]]?.end?.(e)
   handlers.onanimationiteration = e => hooks[e.animationName as T[number]]?.iterate?.(e)
   handlers.onanimationcancel = e => hooks[e.animationName as T[number]]?.cancel?.(e)

   return handlers
}
