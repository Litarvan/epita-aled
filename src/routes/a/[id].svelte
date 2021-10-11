<script context="module">
    import { api } from '/app';

    /** @type {import('@sveltejs/kit').Load} */
    export async function load({ context: { articles }, fetch, page: { params } }) {
        const origin = `${api}/content/${params.id}.md`;
        const content = await fetch(origin).then(r => r.text());

        let title;

        if (params.id === 'aled') {
            title = 'Accueil';
        } else {
            main:
            for (const { content } of articles) {
                for (const { name, id } of content) {
                    if (params.id === id) {
                        title = name;
                        break main;
                    }
                }
            }
        }

        if (!title) {
            return {
                status: 404
            };
        }

        return {
            props: { articles, article: { title, origin, content } }
        };
    }
</script>

<script>
    import marked from 'marked';

    import { title, links, isDark, hasSidemenu } from '/app';
    import Link from '/components/Link.svelte';

    export let articles = [];
    export let article = {};

    let search = '';
    let results = [];

    // TODO: Split sidemenu to layout so that clicking on a link doesn't reset search

    $: dark = $isDark;
    $: results = articles.map(({ content, ...rest }) => ({
        content: content.filter(({ id, name }) =>
            id.includes(search.toLowerCase()) || name.toLowerCase().includes(search.toLowerCase())
        ),
        ...rest
    })).filter(({ content }) => content.length > 0);
</script>

<svelte:head>
    <title>{title(article.title)}</title>
</svelte:head>

<main class="themed" class:dark>
    <div id="sidemenu" class:displayed={$hasSidemenu}>
        <input id="search" placeholder="Rechercher..." bind:value={search} />

        <ul id="categories">
            <li class="category links">
                <span class="name">Liens utiles</span>

                <ul class="questions">
                    {#each links.filter(l => l.large) as { label, to }}
                        <li class="question">
                            <Link {to}>{label}</Link>
                        </li>
                    {/each}
                </ul>
            </li>

            {#each (search ? results : articles) as cat}
                <li class="category">
                    <span class="name">{cat.name}</span>

                    <ul class="questions">
                        {#each cat.content as { id, name }}
                            <li class="question">
                                <Link to={id}>{name}</Link>
                            </li>
                        {/each}
                    </ul>
                </li>
            {/each}
        </ul>
    </div>

    <div id="content">
        <div id="corner">
            <div id="links">
                <Link to={article.origin}>E <!-- TODO: Add icon --></Link>
                <span class="link" on:click={() => isDark.update(v => !v)}>E <!-- TODO: Add icon --></span>
            </div>

            <div id="edit">
                Modifier cet article <!-- TODO: Make this a link -->
            </div>
        </div>

        <div id="article">
            {@html marked(article.content)}
        </div>
    </div>
</main>

<style lang="scss">
    @import "vars";

    main {
        flex-grow: 1;

        &.dark {
            &, #search {
                color: #eee;
            }

            #sidemenu {
                background-color: #222;

                #search {
                    background-color: #333;
                }
            }

            #corner {
                color: #ccc;
            }

            :global(#article code) {
                background-color: #181818;
            }
        }

        &:not(.dark) {
            color: black; // TODO: Is this necessary ?

            #sidemenu {
                background-color: #eee;

                #search {
                    background-color: #ddd;
                    color: #222;
                }
            }

            #corner {
                color: #888;
            }

            :global(#article code) {
                background-color: #f3f3f3;
            }
        }
    }

    #sidemenu, #content {
        height: calc(100vh - #{$nav-height});
        overflow-y: auto;
    }

    #sidemenu {
        flex-direction: column;
        flex-shrink: 0;

        width: 400px;

        overflow-x: hidden;

        #search {
            padding: 13px;

            font-size: 14px;

            border: none;
            outline: none;
        }

        #categories {
            font-size: 13px;

            padding-left: 10px;
            padding-right: 35px;

            &, .questions {
                list-style: none;
            }

            .links {
                display: none;
            }

            .category {
                margin-bottom: 20px;

                .name {
                    font-weight: bold;
                    font-size: 16px;
                }

                .questions {
                    padding-top: 5px;
                    padding-left: 20px;

                    .question {
                        margin-bottom: 2px;
                    }
                }
            }
        }
    }

    #content {
        flex-grow: 1;

        padding: 30px;
        padding-top: 0;

        #corner {
            position: absolute;
            top: $nav-height;
            right: 15px;

            padding: 15px;

            border-bottom-left-radius: 8px;

            // TODO: Apply background color

            #links {
                text-align: right;

                .icon {
                    margin-left: 15px;
                }
            }

            #edit {
                margin-top: 5px;

                font-size: 14px;
                text-decoration: underline;
            }
        }

        #article {
            display: block;

            :global(code) {
                padding: 15px;
                font-size: 13px;
                border-radius: 4px;
            }

            :global(p code), :global(li code) {
                padding: 5px;
            }

            :global(img) {
                max-width: 75%;
            }

            :global(a) {
                text-decoration: underline;
            }
        }
    }

    @media screen and (max-width: $breakpoint) {
        #sidemenu {
            position: absolute;
            width: 100vw;

            transition: transform .25s ease-in-out;

            &:not(.displayed) {
                transform: translateX(-700px);
            }

            #categories .links {
                display: block;
            }
        }

        #edit {
            display: none;
        }

        #content #corner {
            right: 5px;
        }
    }
</style>
