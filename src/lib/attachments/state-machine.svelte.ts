import { createAttachmentKey, type Attachment } from 'svelte/attachments'
import { type StoreContract } from '$lib/types/index.js'

type AnimationHook = (event: AnimationEvent) => void

type Hooks<T extends Record<string, number>> = {
   start?: AnimationHook,
   end?: AnimationHook,
   cancel?: AnimationHook,
   iterate?: AnimationHook
} & { effect?: (args: T[keyof T]) => any }

type Handlers = {
   onanimationstart?: AnimationHook
   onanimationend?: AnimationHook
   onanimationcancel?: AnimationHook
   onanimationiteration?: AnimationHook
}

type Other = {
   decrement?: (value: number) => void
}

type VitalValue<T extends Record<string, number>> = T[keyof T]

export function createStateMachine<TVital extends Record<string, number>>(_vital: TVital, hooks: Hooks<TVital>): Handlers & StoreContract<VitalValue<TVital>> {
   let vitalKey = Object.keys(_vital)[0]
   let vital = $state(Object.values(_vital)[0]) as VitalValue<TVital>

   const subscribers = new Set<(value: VitalValue<TVital>) => void>()

   function notifySubscribers(): void {
      subscribers.forEach(callback => callback(vital as VitalValue<TVital>))
   }

   const handlers: Handlers & Other = {
      [createAttachmentKey()]: (element: Element) => {
         hooks.effect?.(vital)
      }
   }

   const store: StoreContract<VitalValue<TVital>> = {
      subscribe: (callback: (value: VitalValue<TVital>) => void) => {
         subscribers.add(callback)
         callback(vital)
         return () => subscribers.delete(callback)
      },
      set: (newVital: VitalValue<TVital>) => {
         vital = newVital
         notifySubscribers()
      },
      update: (fn: (current: VitalValue<TVital>) => VitalValue<TVital>) => {
         vital = fn(vital)
         notifySubscribers()
      }
   }

   const { entries, defineProperty } = Object
   for (const [key, value] of entries(store)) {
      defineProperty(handlers, key, { value })
   }

   if (hooks.start) handlers.onanimationstart = hooks.start
   if (hooks.end) handlers.onanimationend = hooks.end
   if (hooks.iterate) handlers.onanimationiteration = hooks.iterate
   if (hooks.cancel) handlers.onanimationcancel = hooks.cancel

   return handlers as Handlers & StoreContract<VitalValue<TVital>>
}
