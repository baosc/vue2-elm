
export const loadMore = {
  directives: {
    'load-more': {
      bind: (el, binding) => {
        el.addEventListener('touchstart', () => {
          binding.value();
        });
      },
    },
  },
};

export const getImgPath = {
}
;
