<template>
  <div id="app" :class="{ dark }">
    <div id="nav">
      <div id="left-nav">
        <div id="logo">
          <router-link to="/">ALED</router-link>
        </div>

        <router-link class="nav-el" to="/a/aled">Aide</router-link>
        <a class="nav-el" href="https://prepa-epita.helvetius.net/pegasus/" target="_blank">Pegasus</a>
        <a class="nav-el" href="http://intracom.epita.fr/" target="_blank">Intracom</a>
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
      ...mapState(['dark'])
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
    &.dark {
      #nav {
        background-color: #1e1e1e;
        box-shadow: rgba(0, 0, 0, 0.6) 0 1px 3px -1px;

        a {
          color: white;
        }
      }
    }

    &:not(.dark) {
      #nav {
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px -1px;

        a {
          color: black;
        }
      }
    }
  }

  #nav {
    height: $nav-height;

    z-index: 10;
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-family: 'Roboto', 'Helvetica-Neue', 'Helvetica', 'Arial', sans-serif;

    #left-nav {
      display: flex;
      align-items: center;

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
</style>
