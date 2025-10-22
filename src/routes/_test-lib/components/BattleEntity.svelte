
<script lang="ts">
   import { createSprite } from '$lib/sprite.js'
   import { createAnimationHandler } from '$lib/animations.svelte.js';
   import { getSceneContext } from '$lib/contexts/scene.js';
   import Progress from '$lib/components/Progress.svelte'
   import Sprite from '$lib/components/Sprite.svelte';
   import { type BattleEntityConfig } from '../config.js';

   interface Props {
      attack: (dmg: number) => void;
      endCallback: () => void;
      config: BattleEntityConfig;
      enter?: boolean;
   }

   let { attack, endCallback, config, enter = false }: Props = $props()

   const { FRAME_DURATION } = getSceneContext()

   const sprite = createSprite(config.states, config.spriteSize)

   let hp = $state(config.maxHp)
   let idleFrames = $state(0)
   let attackTimeoutId = $state<number>()

   function idleLoop(frames: number) {
      idleFrames += frames
      if (idleFrames < frames * config.idleLoopMultiplier) return
      idleFrames = 0
      $sprite = config.attackState
   }

   export function hit(dmg: number) {
      $sprite = config.hurtState
      hp -= dmg
      if (hp <= 0) $sprite = config.deathState
   }

   const anim = createAnimationHandler(config.states, {
      [config.idleState]: {
         iterate: (_, numFrames) => idleLoop(numFrames),
         cancel: () => {}
      },
      [config.attackState]: {
         start: () => attackTimeoutId = setTimeout(() => attack(1), FRAME_DURATION * config.attackDelay),
         end: () => $sprite = config.idleState,
         cancel: () => clearTimeout(attackTimeoutId)
      },
      [config.hurtState]: {
         end: () => $sprite = config.idleState,
      },
      [config.deathState]: {
         end: () => endCallback()
      }
   })
</script>

<Sprite {@attach sprite(config.idleState)} {...anim} {enter}>
   <Progress max={config.maxHp} value={hp} />
</Sprite>
