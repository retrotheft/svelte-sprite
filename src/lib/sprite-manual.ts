import { type Attachment } from 'svelte/attachments';
import { untrack } from 'svelte';

interface StoreContract<T> {
  subscribe: (callback: (value: T) => void) => () => void;
  set: (newValue: T) => void;
  update: (fn: (current: T) => T) => void;
}

type Options = {
   url: string,
   classes: string[],
   width: string,
   height: string,
   flip?: boolean
}

function assertIsHTMLElement(element: unknown): asserts element is HTMLElement {
  if (!(element instanceof HTMLElement)) {
    throw new Error('Element is not an HTMLElement');
  }
}

type StatesWithFrames = Record<string, number>

type SpriteFactory<T extends string> = {
   (_state: T): Attachment
} & StoreContract<T> & { flip: () => void, setUrl: (url: string) => void }

export function createSprite<const T extends StatesWithFrames>(
   states: T,
   options: Options
): SpriteFactory<keyof T & string> {
   type State = keyof T & string

   let state = '' as State
   const subscribers = new Set<(value: State) => void>()

   let url = options.url

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

   let elementRef: HTMLElement

   const attachmentFactory = (_state: State) => {
      untrack(() => store.set(_state))
      return (element: Element) => {
         assertIsHTMLElement(element)
         elementRef = element
         element.style.width = options.width
         element.style.height = options.height
         element.style.setProperty('--url', url)
         element.dataset.flip = String(options.flip) ?? "false"

         const callback = (_state: State) => {
            element.className = [ ...options.classes, _state].join(' ')
            element.style.setProperty('--frames', String(states[_state]))
         }

         const unsubscribe = store.subscribe(callback)
         return unsubscribe
      }
   }

   const setUrl = (_url: string) => {
      url = _url
      elementRef.style.setProperty('--url', url)
   }

   const flip = () => {
      elementRef.dataset.flip = elementRef.dataset.flip === 'true' ? 'false' : 'true'
   }

   const { entries, defineProperty } = Object
   for (const [key, value] of entries(store)) {
      defineProperty(attachmentFactory, key, { value })
   }

   defineProperty(attachmentFactory, 'flip', { value: flip })
   defineProperty(attachmentFactory, 'setUrl', { value: setUrl })
   defineProperty(attachmentFactory, 'states', { value: states })
   defineProperty(attachmentFactory, 'options', { value: options })

   return attachmentFactory as SpriteFactory<State>
}
