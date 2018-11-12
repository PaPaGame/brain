<template>
  <transition :name="transitionName">
    <div class="back-to-ceiling" @click="back2top" v-show="visible" :style="custonStyle">

    </div>
  </transition>
</template>

<script>
export default {
  name: 'back2top',
  props: {
    visibilityHeight: {
      type: Number,
      default: 400
    },
    backPosition: {
      type: Number,
      default: 0
    },
    customStyle: {
      type: Object,
      default: ()=> {
        return {
          right: '50px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px',
          background: '#e7eaf1'
        };
      }
    },
    transitionName: {
      type: String,
      default: 'fade'
    }
  },
  data() {
    return {
      visible: false,
      interval: null
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScrollHandler);
  },
  methods: {
    onScrollHandler() {
      this.visible = window.pageYOffset > this.visibilityHeight;
    },
    back2top() {
      const start = window.pageYOffset;
      let i = 0;
      this.interval = setInterval(() => {
        const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500));
        if (next <= this.backPosition) {
          window.scrollTo(0, this.backPosition);
          clearInterval(this.interval);
        } else {
          window.scrollTo(0, next);
        }

        i += 1;
      }, 16.7);
    },
    easeInOutQuad(t, b, c, d) {
      if ((t /= d) < 1) return c / 2 * t * t + b;
      t -= 1;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
  }


};
</script>

<style>
.back-to-ceiling {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}
.back-to-ceiling:hover {
  background: #d5dbe7;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.back-to-ceiling .Icon {
  fill: #9aaabf;
  background: none;
}
</style>
