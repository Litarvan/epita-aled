<script>
    import { hasSidemenu } from '/app';

    export let to = '/';
    export let withClass = '';
    export let large = false;
    export let self = false;

    $: params = to.startsWith('http')
            ? { rel: 'external', target: '_blank' }
            : { 'sveltekit:prefetch': true };
</script>

<a class={`link ${withClass}`} class:large href={to} {...params} on:click={() => hasSidemenu.set(false)}>
    {#if self}
        {to}
    {:else}
        <slot />
    {/if}
</a>

<style lang="scss">
    @import 'vars';

    @media screen and (max-width: $breakpoint) {
        .large {
            display: none;
        }
    }
</style>
