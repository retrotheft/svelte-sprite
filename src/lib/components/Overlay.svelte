<script lang="ts">
   import { createManualSprite } from '$lib/index.js'
   import Sprite from './Sprite.svelte';

   let { sprite, url } = $props()

   const overlay = createManualSprite(sprite.states, {
      ...sprite.options,
      classes: [ ...sprite.options.classes, 'overlay' ],
      url
   })

   $effect(() => $overlay = $sprite)
   $effect(() => overlay.setUrl(url))
</script>

<Sprite {@attach overlay($sprite)} />
