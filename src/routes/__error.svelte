<script context="module">
    /** @type {import('@sveltejs/kit').ErrorLoad} */
    export function load({ status }) {
        return {
            props: { status }
        };
    }
</script>

<script>
    import { title } from '/app';
    import Link from '/components/Link.svelte';

    export let status;
</script>

<svelte:head>
    <title>{title('Erreur')}</title>
</svelte:head>

<div id="error">
    <h1 id="code">{status}</h1>

    <p id="description">
        {#if status === 404}
            Cette page n'existe pas !<br/>
            Si vous êtes perdu, rendez-vous sur <Link to="https://map.epita.eu/" self={true} />.
        {/if}
    </p>
</div>

<style lang="scss">
    #error {
        flex-grow: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #code {
        font-size: 72px;
    }

    #description {
        font-size: 26px;
        text-align: center;

        :global(.link) {
            text-decoration: underline;
        }
    }
</style>
