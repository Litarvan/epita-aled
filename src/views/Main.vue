<template>
  <div id="main" :class="{ dark }">
      <div id="side">
          <input id="search" placeholder="Rechercher..." v-model="search" />

          <ul id="categories">
              <li class="category" v-for="cat of (search ? results : articles)" :key="cat.name">
                  <span class="name">{{ cat.name }}</span>

                  <ul class="questions">
                      <li class="question" v-for="a of cat.content" :key="a.name">
                          <a class="link" @click="select(a.id)">{{ a.name }}</a>
                      </li>
                  </ul>
              </li>
          </ul>
      </div>

      <div id="content">
          <template v-if="id">
              <div id="sider">
                  <div id="edition">
                      <a class="icon" :href="$api + '/content/' + id + '.md'" target="_blank"><font-awesome-icon icon="code" /></a>
                      <span class="icon" @click="setDark"><font-awesome-icon icon="moon" /></span> <!-- TODO: Dark mode -->
                  </div>

                  <div id="last-edit">
                      Dernière édition par Litarvan <!-- TODO: Automatic -->
                  </div>
              </div>

              <div v-html="content">
              </div>
          </template>
      </div>
  </div>
</template>

<script>
    import marked from 'marked';
    import { mapState } from 'vuex';

    export default {
        name: 'aled-main',

        mounted() {
            fetch(this.$api + '/aled.json')
                .then(r => r.json())
                .then(j => this.articles = j);

            this.id = this.$route.params.id;
        },
        data() {
            return {
                articles: [],
                results: [],
                search: '',
                content: '',
                id: ''
            }
        },
        computed: {
            ...mapState(['dark'])
        },
        methods: {
            select(id) {
                this.$router.push('/a/' + id);
            },
            setDark() {
                this.$store.commit('setDark', !this.dark);
            }
        },
        watch: {
            '$route.params.id'(val) {
                this.id = val;
            },
            id(val) {
                fetch(this.$api + '/content/' + val + '.md')
                    .then(r => r.text())
                    .then(t => this.content = t && marked(t));
            },
            search(val) {
                let results = [];

                for (const cat of this.articles) {
                    let content = [];

                    for (const a of cat.content) {
                        if (a.name.toLowerCase().includes(val.toLowerCase())) {
                            content.push(a);
                        }
                    }

                    if (content.length > 0) {
                        results.push({ name: cat.name, content });
                    }
                }

                this.results = results;
            }
        }
    }
</script>

<style lang="scss">
    #main {
        display: flex;
        height: calc(100vh - 75px);

        font-family: 'Helvetica-Neue', 'Roboto', 'Arial', sans-serif;

        &.dark {
            #side {
                background-color: #222;
                color: #eee;

                #search {
                    background-color: #333;
                    color: #eee;
                }
            }

            #content {
                background-color: #1e1e1e;
                color: #eee;

                code {
                    background-color: #181818;
                }

                #sider {
                    color: #ccc;

                    #edition .icon {
                        color: #ccc;
                    }
                }
            }
        }

        &:not(.dark) {
            #side {
                background-color: #eee;
                color: black;

                #search {
                    background-color: #ddd;
                    color: #222;
                }
            }

            #content {
                background-color: white;
                color: black;

                code {
                    background-color: #f3f3f3;
                }

                #sider {
                    color: #888;

                    #edition .icon {
                        color: #888;
                    }
                }
            }
        }
    }

    #side {
        width: 400px;

        display: flex;
        flex-direction: column;

        #search {
            height: 25px;
            padding: 10px;

            border: none;
            outline: none;

            font-size: 14px;
        }

        #categories {
            font-size: 13px;
            padding-left: 10px;

            &, .questions {
                list-style: none;
            }

            .category {
                margin-bottom: 20px;

                .name {
                    font-weight: bold;
                    font-size: 16px;
                }

                .questions {
                    padding-left: 20px;
                    padding-top: 5px;

                    .question {
                        .link:hover {
                            text-decoration: underline;
                            cursor: pointer;
                        }

                        margin-bottom: 2px;
                    }
                }
            }
        }
    }

    #content {
        width: 100%;

        padding: 30px;
        padding-top: 0;

        box-sizing: border-box;

        font-family: 'Helvetica-Neue', 'Roboto', 'Arial', sans-serif;

        overflow-y: auto;

        h1 .id {
            font-style: italic;
            font-weight: normal;

            font-size: 26px;
        }

        code {
            font-size: 13px;

            border-radius: 4px;

            padding: 15px;
        }

        #sider {
            position: absolute;
            top: 75px;
            right: 15px;

            padding: 15px;

            border-bottom-left-radius: 8px;

            #edition {
                text-align: right;

                .icon {
                    margin-left: 15px;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }

            #last-edit {
                text-decoration: underline;
                font-size: 14px;

                margin-top: 5px;
            }
        }
    }
</style>
