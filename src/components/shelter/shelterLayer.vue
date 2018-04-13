<template>
  <div>
    <div class="div_shelter" v-bind:style="{background:'rgba(0, 0, 0,.'+this.transparency+')'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {

    },
    data () {
      return {

      }
    },
    props: {
      transparency: { //透明度
        type: Number,
        default: 8
      },
    },

    methods: {

    }

  }

</script>

<style>

  .div_shelter {
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .8);
  }


  .showDlg
  {

  }

</style>
