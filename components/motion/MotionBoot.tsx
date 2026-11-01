/**
 * Inline, render-blocking boot script. Adds `js-motion` only when JS runs and
 * the visitor has not asked for reduced motion; a watchdog removes it if the
 * motion bundle never mounts, so content cannot stay hidden.
 */
const script = `(()=>{try{var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('js-motion');if(sessionStorage.getItem('bl-intro'))d.classList.add('intro-seen');setTimeout(function(){if(!window.__blMotion)d.classList.remove('js-motion')},3000)}catch(e){}})();`;

export function MotionBoot() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
