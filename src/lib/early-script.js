// Tiny script that runs in <head> before first paint: decides whether the motion system is on.
// It is kept as ONE string so that the Content-Security-Policy can allow exactly this script by its hash
// (astro.config.mjs computes the hash at build time and writes it into dist/_headers).
// If you change a character here, nothing else needs updating.
export const EARLY_SCRIPT = `(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;try{if(localStorage.getItem('rb-fx')==='off'){d.classList.add('fx-off');return}}catch(e){}d.classList.add('motion-on');try{var p=location.pathname;if(!sessionStorage.getItem('rb-seen')&&(p==='/'||p==='/id'||p==='/id/'))d.classList.add('has-loader')}catch(e){}setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion-on','has-loader')},4000)})();`;
