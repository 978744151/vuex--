# ct

> 项目描述

## Build Setup

``` html
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).\



```bash
1、    npm install --global vue-cli

2、	vue init webpack vuetest

3、 vant
cnpm i vant -S
cnpm i babel-plugin-import -D
在babelrc中
  "plugins": [
    ["import", { "libraryName": "vant", "style": true, "libraryDirectory": "es", }],
    ["transform-vue-jsx", "transform-runtime"]
  ]

4、 mintui
npm install mint-ui -S
import Mint from 'mint-ui';Vue.use(Mint);】

5、 axios
cnpm i axios -d

6、less 
cnpm install less less-loader --save-dev
 
build/webpack.base.conf.js 中
 
          {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader",
          }
```

