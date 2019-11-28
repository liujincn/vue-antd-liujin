const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    // set svg-sprite-loader
    chainWebpack: config => {
        config.module.rules.delete("svg") //删除默认配置中处理svg,
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include
            .add(resolve('src/icons')) //处理svg目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        config.plugin('webpack-bundle-analyzer')
            .use(BundleAnalyzerPlugin)
            .init(Plugin => new Plugin());

    }
}

