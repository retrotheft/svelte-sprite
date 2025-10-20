# Sprite Design

```ts
const sprite = createSprite(options)
```

```svelte
<div {@attach sprite('run')}></div>
```

Calling the return value of createSprite needs to be the attachment factory.
Subscribing to sprite needs to be the state

## Animation driven state machines

Each state machine is driven by a single vital
Each state might also have its own corresponding sprite and element
Current active state can just be a variable in the component itself

### Walk

based on `counter`

`iteration`: increase counter

randomly performs different animations, simulating traversing a dungeon
once counter reaches a threshold, might transition to a different state, e.g. `battle`

### Battle

based on `hp`

`cancel`: if an animation is canceled it's because the entity got hurt, so run the hurt animation and decrease hp
`end`: check if either `attack`, `recover` or `hurt`. hurt goes to attack, attack goes to recover, which goes to attack. When attack ends, fire the callback to change the opponent's animation to hurt.

Not sure what the mechanism for changing animations is. Animation.cancel might work fine though.

```ts
let opponent = $state()

const walk = createStateMachine({ counter: 0 }, {
   iterate: (event: AnimationEvent) = counter++
})

const battle = createStateMachine({ hp: 10 }, {
   cancel: (event: AnimationEvent) => hp--,
   end: (event: AnimationEvent) => hit(opponent)
   effect: (hp) => hp <= 0 ? gameOver() : () => {}
})
```

```svelte
<div {@attach sprite('run') {...walk}></div>
<div {@attach battleSprite('attack') {...battle}></div>
```
