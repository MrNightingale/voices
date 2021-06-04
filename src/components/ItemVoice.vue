<template>
  <div
    class="voice"
    :class="{ 'voice--selected': isSelected }"
    @click="$emit('select-voice', id)"
  >
    <div
      class="voice__img-wrapper"
    >
      <img
        :src="getVoiceIcon"
        :alt="name"
        class="voice__img"
      >
      <div
        class="voice__fav-wrapper"
        @click.capture.stop="$emit('handle-favourite', id)"
      >
        <img
          :src="getFavIcon"
          alt="heart"
          class="voice__fav-img"
        >
      </div>
    </div>
    <h3 class="voice__name">
      {{ name }}
    </h3>
  </div>
</template>
<script>
export default {
  name: 'ItemVoice',
  props: {
    id: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    isFavourite: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  computed: {
    getVoiceIcon () {
      return this.icon ? `${this.publicPath}icons/${this.icon}` : null
    },
    getFavIcon () {
      const FAV_ICON_OFF = `${this.publicPath}icons/voice-favourite-off.svg`
      const FAV_ICON = `${this.publicPath}icons/voice-favourite.svg`
      return this.isFavourite ? FAV_ICON : FAV_ICON_OFF
    }
  }
}
</script>
<style lang="scss" scoped>
.voice {
  cursor: pointer;

  &__img-wrapper {
    position: relative;
    background-color: #d2d2d2;
    border-radius: 100%;
  }

  &__name {
    color: #d2d2d2;
    font-size: 13px;
    text-align: center;
  }

  &__fav-wrapper {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    height: 25px;
    width: 25px;
    background-color: #fff;
    border-radius: 100%;
    text-align: center;
    line-height: 1.7;
    z-index: 1;
  }

  &:hover {
    .voice {
      &__img-wrapper {
        background-color: #fff;
      }

      &__name {
        color: #fff;
      }

      &__fav-wrapper {
        display: block;
      }
    }
  }

  &--selected {
    .voice {
      &__img-wrapper {
        background: linear-gradient(#02d3ee, #00c8ff);
      }

      &__name {
        color: #01cef1;
      }
    }

    &:hover {
      .voice__name {
        color: #01cef1;
      }
    }
  }
}
</style>
