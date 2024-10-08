import {MsfwConfig, MsfwContext} from '../../../types'
import WpAssetModules from './asset-modules'
import WpBabel from './babel'
import {WpCommon} from './common'
import WpDevelopment from './development'
import {mergeWebpackConfig} from './merge-config'
import WpPlugins from './plugins'
import WpProduction from './production'
import WpStyle from './style'
import WebpackChain from './webpack-chain'

function overrideWebpack(context: MsfwContext) {
  const webpackChain = new WebpackChain(context)

  new WpCommon().setup(webpackChain)
  new WpStyle().setup(webpackChain)
  new WpAssetModules().setup(webpackChain)
  new WpBabel().setup(webpackChain)
  new WpPlugins().setup(webpackChain)

  return webpackChain
}

export function overrideWebpackDev(context: MsfwContext, msfwConfig: MsfwConfig) {
  const webpackChain = overrideWebpack(context)

  new WpDevelopment().setup(webpackChain)

  if (msfwConfig.devServer) {
    webpackChain.merge({
      devServer: msfwConfig.devServer,
    })
  }

  const webpackConfig = webpackChain.config

  return mergeWebpackConfig(msfwConfig, webpackConfig, context)
}

export function overrideWebpackProd(context: MsfwContext, msfwConfig: MsfwConfig) {
  const webpackChain = overrideWebpack(context)

  new WpProduction().setup(webpackChain)

  const webpackConfig = webpackChain.config

  return mergeWebpackConfig(msfwConfig, webpackConfig, context)
}
