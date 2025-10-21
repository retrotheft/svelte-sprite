import { type Attachment } from 'svelte/attachments';
import { untrack } from 'svelte';

interface StoreContract<T> {
  subscribe: (callback: (value: T) => void) => () => void;
  set: (newValue: T) => void;
  update: (fn: (current: T) => T) => void;
}

type Options = {
   width: string,
   height: string
}

function assertIsHTMLElement(element: unknown): asserts element is HTMLElement {
  if (!(element instanceof HTMLElement)) {
    throw new Error('Element is not an HTMLElement');
  }
}

type SpriteFactory<T extends string> = {
   (_state: T): Attachment
} & StoreContract<T>

export function createSprite<const T extends readonly string[]>(states: T, options: Options): SpriteFactory<T[number]> {
   let state = states[0] as T[number]
   const subscribers = new Set<(value: T[number]) => void>()

   function notifySubscribers(): void {
      subscribers.forEach(callback => callback(state))
   }

   const store: StoreContract<T[number]> = {
      subscribe: (callback: (value: T[number]) => void) => {
         subscribers.add(callback)
         callback(state)
         return () => subscribers.delete(callback)
      },
      set: (newState: T[number]) => {
         state = newState
         notifySubscribers()
      },
      update: (fn: (current: T[number]) => T[number]) => {
         state = fn(state)
         notifySubscribers()
      }
   }

   const attachmentFactory = (_state: T[number]) => {
      untrack(() => store.set(_state)) // svelte don't like this kind of behaviour
      return (element: Element) => {
         // will never run again because _state is a primitive
         assertIsHTMLElement(element)
         element.style.width = options.width
         element.style.height = options.height
         const callback = (_state: T[number]) => {
            element.className = `${_state}-animation`
         }
         const unsubscribe = store.subscribe(callback)
         return unsubscribe
      }
   }

   const { entries, defineProperty } = Object
   for (const [key, value] of entries(store)) {
      defineProperty(attachmentFactory, key, { value })
   }

   return attachmentFactory as SpriteFactory<T[number]>
}
