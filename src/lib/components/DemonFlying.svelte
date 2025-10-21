<script lang="ts">
   import '../assets/Demon-Flying.css'
   import { createSprite } from '$lib/dollar-stores/sprite.js'

   const sprite = createSprite({
      width: '81px',
      height: '71px'
   })
</script>

<div {@attach sprite('FLYING')}></div>
