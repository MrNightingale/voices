<template>
  <section class="section">
    <div class="section__title-wrapper">
      <h2 class="section__title">
        {{ title }}
      </h2>
    </div>
    <div class="section__items-list">
      <item-voice
        v-for="voice in voices"
        :id="voice.id"
        :key="voice.id"
        :icon="voice.icon"
        :name="voice.name"
        :is-selected="voice.id === selected"
        :is-favourite="hasFavVoice(voice.id)"
        @select-voice="value => $emit('select-voice', value)"
        @handle-favourite="value => $emit('handle-favourite', value)"
      />
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import ItemVoice from '@/components/ItemVoice'

export default {
  name: 'AppSection',
  components: {
    ItemVoice
  },
  props: {
    title: {
      type: String,
      required: true
    },
    voices: {
      type: Array,
      required: true
    },
    selected: {
      type: String,
      required: true
    },
    isFavList: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('voices', ['favourites'])
  },
  methods: {
    hasFavVoice (id) {
      if (this.isFavList) {
        return true
      } else {
        return !!this.favourites.find(el => el.id === id)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.section {
  margin-top: 30px;

  &__title-wrapper {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;

    &::after {
      content: "";
      flex: 1 1 auto;
      margin-left: 10px;
      border-bottom: 1px solid rgb(133 133 133 / 30%);
    }
  }

  &__title {
    flex: 0 1 auto;
    color: #858585;
    text-transform: uppercase;
    font-weight: normal;
    font-size: 16px;
  }

  &__items-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px 50px;
    margin-top: 15px;

    @media screen and (max-width: 768px) {
      gap: 10px 20px;
    }
  }
}
</style>
