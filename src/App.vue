<template>
  <div id="app">
    <header class="header container">
      <div class="header__search-wrapper">
        <input
          id="search"
          v-model.trim="searchQuery"
          type="search"
          name="Search"
          class="header__search"
        >
      </div>
      <div class="header__filter">
        <div class="header__filter-categories">
          <label for="categories">
            <img
              src="@/assets/filter.svg"
              alt="eye"
            >
          </label>
          <select
            id="categories"
            v-model="category"
            name="categories"
            class="header__filter-select"
          >
            <option
              v-for="cat in categories"
              :key="cat"
              :value="cat"
            >
              {{ cat }}
            </option>
          </select>
        </div>
        <div class="header__filter-sort">
          <label for="sort">
            <img
              src="@/assets/order.svg"
              alt="ordered list"
            >
          </label>
          <select
            id="sort"
            v-model="sortOption"
            name="sort"
            class="header__filter-select"
          >
            <option value="asc">
              Ascending
            </option>
            <option value="desc">
              Descending
            </option>
          </select>
        </div>
        <button
          class="header__filter-random"
          @click="randomVoice"
        >
          <img
            src="@/assets/button-random.svg"
            alt="random"
          >
        </button>
      </div>
    </header>
    <main class="main container">
      <app-section
        v-if="filteredFavourites.length"
        title="Favourite voices"
        :voices="filteredFavourites"
        :selected="selected"
        :is-fav-list="true"
        @select-voice="setSelected"
        @handle-favourite="handleFavourite"
      />
      <app-section
        v-if="filteredVoices.length"
        title="Pro voices"
        :voices="filteredVoices"
        :selected="selected"
        @select-voice="setSelected"
        @handle-favourite="handleFavourite"
      />
    </main>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AppSection from '@/components/AppSection'

export default {
  name: 'App',
  components: {
    AppSection
  },
  data () {
    return {
      searchQuery: '',
      sortOption: 'asc',
      category: ''
    }
  },
  computed: {
    ...mapState('voices', ['voices', 'favourites', 'selected', 'categories']),
    filteredVoices () {
      const filtered = this.filterVoices(this.voices)
      if (this.sortOption) return this.sortVoices(filtered)
      return filtered
    },
    filteredFavourites () {
      const filtered = this.filterVoices(this.favourites)
      if (this.sortOption) return this.sortVoices(filtered)
      return filtered
    }
  },
  created () {
    this.setVoices()
  },
  methods: {
    ...mapMutations('voices', {
      setSelected: 'SET_SELECTED',
      handleFavourite: 'HANDLE_FAVOURITE'
    }),
    ...mapActions('voices', ['setVoices']),
    filterVoices (list) {
      if (this.searchQuery || this.category) {
        const filtered = list.filter(el => {
          const name = el.name.trim().toLowerCase()
          return name.includes(this.searchQuery.toLowerCase())
        })
        if (this.category) return filtered.filter(el => el.tags.includes(this.category))
        return filtered
      } else {
        return list
      }
    },
    sortVoices (list) {
      if (this.sortOption === 'asc') {
        return list.sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }))
      } else {
        return list.sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true })).reverse()
      }
    },
    randomVoice () {
      const random = this.filteredVoices[
        Math.floor(Math.random() * this.filteredVoices.length)
      ].id
      this.setSelected(random)
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #1b1b1b;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  margin: 0 auto;
  max-width: 910px;
  width: 100%;
  padding: 0 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  max-width: 980px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &__search-wrapper {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 32px;
      width: 32px;
      background: url("~@/assets/search.svg");
    }
  }

  &__search {
    background-color: #000;
    border: 1px solid #000;
    border-radius: 15px;
    padding: 7px 10px 5px 30px;
    color: #fff;
    font-family: inherit;
    font-size: 16px;

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
      height: 12px;
      width: 12px;
      background: url("~@/assets/search-close.svg");
    }
  }

  &__filter {
    display: flex;

    &-categories,
    &-sort {
      display: flex;
      align-items: center;
      margin-left: 20px;
    }

    &-select {
      margin-left: 10px;
      background-color: #000;
      padding: 5px 10px;
      border: 1px solid transparent;
      color: rgb(255 255 255 / 60%);
      font-family: inherit;
      text-transform: capitalize;
    }

    &-random {
      appearance: none;
      background: inherit;
      border: none;
      cursor: pointer;
      margin-left: 20px;
    }
  }
}
</style>
