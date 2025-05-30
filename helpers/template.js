//importar los helpers de navbar y basehtml
//exportarmos funcion que crear la union de todo

const baseHtml = require ('./baseHtml')
const getNavBar = require ('./getNavBar')

module.exports = function template (content) {
  const paginaCompleta = getNavBar () + content;
  return baseHtml (paginaCompleta)
};