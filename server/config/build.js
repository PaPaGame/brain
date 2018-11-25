// 动画支持
const ora = require('ora');
const chalk = require('chalk');
const webpack = require('webpack');
// 根据传入的环境变量对不用配置进行打包
const webpackConfig = process.env.NODE_ENV === 'production' ? require('./webpack.prod.config') : require('./webpack.dev.config');

const spinner = ora(`building for ${process.env.NODE_ENV} ${process.env.LOG_LEVEL} ...\n`);
spinner.start();

webpack(webpackConfig, (err, stats) => {
  spinner.stop();
  if (err) {
    return;
  }

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // if you are using ts-loader, setting this to true will make tyescript errors show up during build
    chunks: false,
    chunkModules: false
  }) + '\n\n');

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'));
    process.exit(1);
  }

  console.log(chalk.cyan('  Build complete.\n'));
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ));
});