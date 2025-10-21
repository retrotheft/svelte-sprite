import { createAttachmentKey, type Attachment } from 'svelte/attachments'

type AnimationHook = (event: AnimationEvent) => void

type Hooks = {
   start?: AnimationHook,
   end?: AnimationHook,
   cancel?: AnimationHook,
   iterate?: AnimationHook
}

type Handlers = {
   onanimationstart?: (event: AnimationEvent) => void
   onanimationend?: (event: AnimationEvent) => void
   onanimationcancel?: (event: AnimationEvent) => void
   onanimationiteration?: (event: AnimationEvent) => void
}

export function createAnimationHandler(_animationName: string, hooks: Hooks): Handlers {
   const handlers: Handlers = {}
   const animationName = _animationName + '-frames'

   if (hooks.start) {
      handlers.onanimationstart = (event) => {
         if (event.animationName === animationName) {
            hooks.start?.(event)
         }
      }
   }

   if (hooks.end) {
      handlers.onanimationend = (event) => {
         console.log(animationName, event.animationName)
         if (event.animationName === animationName) {
            hooks.end?.(event)
         }
      }
   }

   if (hooks.iterate) {
      handlers.onanimationiteration = (event) => {
         if (event.animationName === animationName) {
            hooks.iterate?.(event)
         }
      }
   }

   if (hooks.cancel) {
      handlers.onanimationcancel = (event) => {
         if (event.animationName === animationName) {
            hooks.cancel?.(event)
         }
      }
   }

   return handlers
}
