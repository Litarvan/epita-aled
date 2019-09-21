<template>
  <div id="app" :class="{ dark, sidemenu }">
    <div id="nav">
      <div id="left-nav">
        <span id="sidemenu-display" v-if="$router.currentRoute.name === 'article'" @click="$store.commit('triggerMenu')"><font-awesome-icon icon="bars" /></span>

        <div id="logo" @click="sidemenu = false">
          <router-link to="/">ALED</router-link>
        </div>

        <div id="big-links">
          <router-link class="nav-el" to="/a/aled">Aide</router-link>
          <a class="nav-el" href="https://prepa-epita.helvetius.net/pegasus/" target="_blank">Pegasus</a>
          <a class="nav-el" href="http://intracom.epita.fr/" target="_blank">Intracom</a>
        </div>
        <a class="nav-el" href="https://github.com/Litarvan/epita-aled" target="_blank">Github</a>
        <router-link class="nav-el" to="/about">À Propos</router-link>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState(['dark', 'sidemenu'])
    }
  }
</script>

<style lang="scss">
  @import "fonts";

  $nav-height: 75px;

  html, body {
    margin: 0;
    padding: 0;
  }

  * {
    transition: background-color 200ms ease, color 150ms ease-in-out;
  }

  #app {
    display: flex;
    flex-direction: column;

    height: 100vh;

    &.dark {
      &, #nav {
        background-color: #1e1e1e;
      }

      #nav {
        box-shadow: rgba(0, 0, 0, 0.6) 0 1px 3px -1px;

        a, #sidemenu-display {
          color: white;
        }
      }
    }

    &:not(.dark) {
      &, #nav {
        background-color: white;
      }

      #nav {
        box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px -1px;

        a, #sidemenu-display {
          color: black;
        }
      }
    }
  }

  #nav {
    width: 100vw;
    height: $nav-height;

    z-index: 10;

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-family: 'Roboto', 'Helvetica-Neue', 'Helvetica', 'Arial', sans-serif;

    #left-nav {
      display: flex;
      align-items: center;

      #sidemenu-display {
        display: none;

        margin-left: 20px;
        font-size: 20px;

        margin-right: -5px; // So i don't have to edit logo margin, to make it look nice on about page where there isn't the sidemenu-display icon
      }

      #logo {
        margin-left: 25px;

        font-size: 32px;
        font-weight: bold;

        margin-top: -4px;

        font-family: 'Lato', 'Helvetica-Neue', 'Helvetica', 'Arial', sans-serif;

        a {
          text-decoration: none;
        }
      }

      .nav-el {
        margin-left: 35px;
        font-size: 16px;
        font-weight: bold;

        text-decoration: none;

        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }

  @media screen and (max-width: 700px) {
    #nav #left-nav {
      display: flex;
      width: 100vw;

      justify-content: space-around;

      #big-links {
        display: none;
      }

      #sidemenu-display {
        display: inline-block;
        margin-right: -21px; // Makes it so much simple xd
      }

      #sidemenu-display, #logo, .nav-el {
        margin-left: 0;
      }
    }
  }
</style>
