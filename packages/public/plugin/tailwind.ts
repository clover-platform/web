import plugin from 'tailwindcss/plugin';

export default plugin(({addVariant}) => {
  // 适配移动端，且满足之前 viewport 的方式
  addVariant('m', '@media (max-width: 375px) { html.mobile & }');
})
