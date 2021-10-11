<script context="module">
    import { api } from '/app';

    // TODO: Cleaner way ?
    let articles;

    /** @type {import('@sveltejs/kit').Load} */
    export async function load({ fetch }) {
        if (!articles) {
            articles = await fetch(`${api}/aled.json`).then(r => r.json());
        }

        return {
            context: { articles }
        };
    }
</script>

<script>
    import '/app.scss';

    import { page } from '$app/stores';
    import { app, links, isDark, hasSidemenu } from '/app';

    import Link from '/components/Link.svelte';

    $: dark = $isDark; // TODO: Simpler way ?
</script>

<nav class="themed" class:dark> <!-- TODO: Apply 'dark' class to body ? -->
    {#if $page.path.startsWith('/a/')}
        <!-- TODO: Stick it with the logo -->
        <span id="sidemenu-button" class="clickable" on:click={() => hasSidemenu.update(v => !v)}>
            M <!-- TODO: Sidemenu icon -->
        </span>
    {/if}

    {#each links as { label, ...params }}
        <Link {...params}>{label}</Link>
    {/each}
</nav>

<slot />

<style lang="scss">
    @import 'vars';

    nav {
        $nav-shadow: 0 1px 3px -1px;

        align-items: center;
        height: $nav-height;
        z-index: 2;

        font-family: $font-roboto;

        &:not(.dark) {
            box-shadow: rgba(0, 0, 0, 0.3) $nav-shadow;
        }

        &.dark {
            box-shadow: rgba(0, 0, 0, 0.6) $nav-shadow;
        }

        :global(.link) {
            margin-left: 35px;

            font-size: 16px;
            font-weight: bold;
        }

        :global(.link.logo) {
            margin-top: -4px;
            margin-left: 25px;

            font-family: $font-lato;
            font-size: 32px;
            font-weight: bold;
        }
    }

    #sidemenu-button {
        display: none;

        /*
         * I'm doing this so that I don't have to edit the logo's margin, which makes it look nice on the 'about'
         * page where the icon is never displayed.
         */
        margin-right: -5px; // TODO: Is this necessary ?
        margin-left: 20px;

        font-size: 20px;
    }

    @media screen and (max-width: $breakpoint) {
        nav {
            justify-content: space-around;

            :global(.link), #sidemenu-button {
                margin-left: 0;
            }
        }

        #sidemenu-button {
            display: inline-block;
            margin-right: -21px; // Makes it so much simpler xd
        }
    }
</style>
