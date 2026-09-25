// Os testes rodam sem acesso ao Google Fonts; sem isto o navegador usa uma fonte reserva mais estreita
// e a checagem de texto vazando passa aqui mas falha na tela do jogador. Serve as fontes reais (OFL) a partir de tools/fonts.
const fs = require('fs'), path = require('path');
const F = (file, family, weight) => `@font-face{font-family:'${family}';font-weight:${weight};font-style:normal;font-display:block;src:url(data:font/woff2;base64,${fs.readFileSync(path.join(__dirname, 'fonts', file)).toString('base64')}) format('woff2')}`;
const CSS = [
  F('silkscreen-latin-400-normal.woff2', 'Silkscreen', 400),
  F('ibm-plex-mono-latin-400-normal.woff2', 'IBM Plex Mono', 400),
  F('ibm-plex-mono-latin-600-normal.woff2', 'IBM Plex Mono', 600),
  F('ibm-plex-sans-latin-400-normal.woff2', 'IBM Plex Sans', 400),
  F('ibm-plex-sans-latin-600-normal.woff2', 'IBM Plex Sans', 600),
].join('\n');
async function useRealFonts(page) {
  await page.route(/fonts\.googleapis\.com/, r => r.fulfill({status: 200, contentType: 'text/css', body: CSS}));
  await page.route(/fonts\.gstatic\.com/, r => r.abort());
}
// espera as fontes carregarem de verdade antes de medir
const fontsReady = page => page.evaluate(() => document.fonts.ready.then(() => document.fonts.check("9px 'IBM Plex Mono'") && document.fonts.check("8px Silkscreen")));
module.exports = {useRealFonts, fontsReady};
