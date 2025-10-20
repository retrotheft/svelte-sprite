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

type SpriteFactory = {
   (_state: string): Attachment
} & StoreContract<string>

export function createSprite(options: Options): SpriteFactory {
   let state = ''
   const subscribers = new Set<(value: string) => void>()

   function notifySubscribers(): void {
      subscribers.forEach(callback => callback(state))
   }

   const store: StoreContract<string> = {
      subscribe: (callback: (value: string) => void) => {
         subscribers.add(callback)
         callback(state)
         return () => subscribers.delete(callback)
      },
      set: (newState: string) => {
         state = newState
         notifySubscribers()
      },
      update: (fn: (current: string) => string) => {
         state = fn(state)
         notifySubscribers()
      }
   }

   const attachmentFactory = (_state: string) => {
      untrack(() => store.set(_state))
      // store.set(_state)
      return (element: Element) => {
         // will never run again because _state is a primitive
         assertIsHTMLElement(element)
         element.style.width = options.width
         element.style.height = options.height
         const callback = (_state: string) => {
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

   return attachmentFactory as SpriteFactory
}
