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

type StatesWithFrames = Record<string, number>

type SpriteFactory<T extends string> = {
   (_state: T): Attachment
} & StoreContract<T>

export function createSprite<const T extends StatesWithFrames>(
   statesWithFrames: T,
   options: Options
): SpriteFactory<keyof T & string> {
   type State = keyof T & string

   let state = '' as State
   const subscribers = new Set<(value: State) => void>()

   function notifySubscribers(): void {
      subscribers.forEach(callback => callback(state))
   }

   const store: StoreContract<State> = {
      subscribe: (callback: (value: State) => void) => {
         subscribers.add(callback)
         callback(state)
         return () => subscribers.delete(callback)
      },
      set: (newState: State) => {
         state = newState
         notifySubscribers()
      },
      update: (fn: (current: State) => State) => {
         state = fn(state)
         notifySubscribers()
      }
   }

   const attachmentFactory = (_state: State) => {
      untrack(() => store.set(_state))
      return (element: Element) => {
         assertIsHTMLElement(element)
         element.style.width = options.width
         element.style.height = options.height

         const callback = (_state: State) => {
            element.className = `${_state}-animation`
            // Set --frames CSS variable
            element.style.setProperty('--frames', String(statesWithFrames[_state]))
         }

         const unsubscribe = store.subscribe(callback)
         return unsubscribe
      }
   }

   const { entries, defineProperty } = Object
   for (const [key, value] of entries(store)) {
      defineProperty(attachmentFactory, key, { value })
   }
   return attachmentFactory as SpriteFactory<State>
}
