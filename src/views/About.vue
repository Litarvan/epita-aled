<template>
    <div id="about" :class="{ dark }">
        <h2>EPITA ALED v1.0.0 - <a href="https://github.com/Litarvan/epita-aled">Sources</a></h2>

        <p>
            J'ai fait ce site pour ne pas avoir à répéter pleins de fois la même chose aux gens, parce qu'en deux semaines
            j'ai déjà récité plusieurs fois à des gens l'actuel contenu des pages des bases d'i3, UEFI vs BIOS, des disques/partitions/filesystems,
            et de pleins d'autres :^)
        </p>

        <p>
            Ca évitera aussi sûrement des tonnes de questions récurrentes aux profs, et permettra aux étudiants d'avoir une petite
            référence pour tout ce qu'ils utiliseront quotidiennement.
        </p>

        <span id="written-by">Écrit et développé par</span>

        <div id="author">
            <img src="https://avatars3.githubusercontent.com/u/8712146?s=128&v=4" />

            <div id="author-right">
                <h2>Adrien <span id="nickname">"Litarvan"</span> Navratil</h2>
                <div id="socials">
                    <a href="https://github.com/Litarvan" target="_blank"><font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon></a>
                    <a href="https://twitter.com/SharkLitarvan" target="_blank"><font-awesome-icon :icon="['fab', 'twitter']"></font-awesome-icon></a>
                </div>
            </div>
        </div>

        <p id="copyright">
            Copyright (c) 2019 - Adrien Navratil et contributeurs - Sous <a href="https://github.com/Litarvan/epita-aled/blob/master/LICENSE">license MIT</a>
        </p>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'about',

        computed: {
            ...mapState(['dark'])
        },
    }
</script>

<style lang="scss" scoped>
    #about {
        font-family: 'Helvetica-Neue', 'Roboto', 'Arial', sans-serif;

        flex: 1;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        text-align: center;

        overflow-y: auto;

        &.dark {
            color: #eee;
            background-color: #1e1e1e;

            a {
                color: #eee;
            }
        }

        &:not(.dark) {
            color: black;
            background-color: white;

            a {
                color: black;
            }
        }
    }

    p {
        width: 40%;
    }

    #written-by {
        font-style: italic;
        font-size: 18px;

        margin-top: 25px;
    }

    #author {
        display: flex;
        margin-top: 20px;

        h2 {
            font-size: 22px;
        }

        img {
            border-radius: 50%;

            width: 128px;
            height: 128px;
        }

        #author-right {
            display: flex;
            flex-direction: column;

            margin-left: 25px;

            #nickname {
                font-style: italic;
                font-size: 18px;
            }

            #socials {
                display: flex;
                justify-content: space-evenly;

                font-size: 32px;
            }
        }
    }

    #copyright {
        margin-top: 50px;
        padding-bottom: 25px;

        font-style: italic;
    }

    @media screen and (max-width: 700px) {
        p {
            width: 90%;
        }

        #author {
            margin-left: 20px;
            margin-right: 20px;
            margin-top: 25px;

            h2 {
                margin-top: 5px;
            }

            #socials {
                margin-bottom: 8px;
            }
        }
    }

    @media screen and (max-height: 760px) {
        #about {
            justify-content: flex-start;
        }
    }
</style>
