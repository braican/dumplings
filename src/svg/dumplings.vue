<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 349.21 500"><path
    d="M76.62,399.22c8.8-17.69,2.9-30.3,11.08-62.87s13.5-52,20.38-62.78,28.23-26.74,31.44-36.64-17.77-52.78-14-60.6c7.91-16.09,4.56-29.85,8.42-36s8.37-6.5,12.47-15.61-2.6-10.94,5.21-21.54,17.91-22.48,18.14-32.63S151.83,18,164.89,10.49c14.44-5.51,62,37.1,74.45,48.18s68.26,37.09,67,66.39S365.42,240,325.62,329.58c-31.47,70.87-102.8,144.61-124.41,157.3-16.1,9.45-88.4-6.12-112.92-.51-29.39,6.72-67.32-.32-75.3-6.6s1.44-20.42,11.28-32.4S67.83,416.91,76.62,399.22Z"
    :fill="themeMap.dumplingFill"
    :stroke="themeMap.dumplingStroke"
    stroke-miterlimit="10"
    stroke-width="24"
  /><g
    stroke-width="16"
    :stroke="themeMap.detailsStroke"
    fill="none"
    stroke-miterlimit="10"
  ><path d="M162,357.55s5.31,36.31,32.93,62.72" /><path d="M187.2,334.3s13.11,31.75,47.88,46.49" /><path d="M209.05,303.68s20.66,33.37,55,48.58" /><path d="M221.6,267.8s34,33.1,58.86,40.84" /><path d="M227.16,225.26S255.57,254.4,284,254.4" /><path d="M238.59,177.87S263.8,197.53,289,197.53" /></g></svg>
</template>

<script>

const themes = {
  white_outline: {
    dumplingFill: 'none',
    dumplingStroke: '#ffffff',
    detailsStroke: '#ffffff',
  },
  gray_outline: {
    dumplingFill: 'none',
    dumplingStroke: '#cccccc',
    detailsStroke: '#cccccc',
  },
  red_outline: {
    dumplingFill: 'none',
    dumplingStroke: '#ff0051',
    detailsStroke: '#ff0051',
  },
  red_fill: {
    dumplingFill: '#ff0051',
    dumplingStroke: '#ff0051',
    detailsStroke: '#ffffff',
  },
};

export default {
  name: 'LogoSvg',
  props: {
    theme: {
      default: 'white_outline',
      type: String
    },
  },
  computed: {
    themeMap() {
      return themes[this.theme] || themes.white_outline;
    },
  }
};
</script>
