/* Background music shared by every page.
   Browsers block autoplay with sound until the visitor interacts, so:
   - homepage: the boot screen shows an "Open portfolio" button (invitation-site style);
     that click starts the music.
   - other pages: playback resumes from the saved position; if the browser blocks it,
     it resumes on the visitor's first click or key press.
   Set TRACK.src to an audio file you have the rights to use. src: null disables music. */
(()=>{
'use strict';
const TRACK = {
  src: '/assets/music/background.mp3?v=2',
  title: 'Background music',  // shown in the status bar tooltip
  artist: '',
  credit: ''            // licence / attribution text if the licence requires it
};
// Settings from the CMS (Pengaturan → Musik Latar) override the defaults above.
const CMS = (window.SITE_CONFIG && window.SITE_CONFIG.music) || null;
if (CMS) {
  TRACK.src = CMS.enabled === false ? null : (CMS.file || TRACK.src);
  TRACK.title = CMS.title || TRACK.title;
  TRACK.artist = CMS.artist || '';
  TRACK.credit = CMS.credit || '';
}
const VOLUME = CMS && Number.isFinite(+CMS.volume) ? Math.min(100, Math.max(0, +CMS.volume)) / 100 : 0.35;
const KEY = 'cvstudio-music';
const enabled = !!TRACK.src;
const store = {
  get(){ try { return JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (e) { return null; } },
  set(v){ try { sessionStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
};
let audio = null, btn = null, wantPlaying = false;

function ensureAudio(){
  if (audio || !enabled) return audio;
  audio = new Audio(TRACK.src);
  audio.loop = true; audio.preload = 'auto'; audio.volume = VOLUME;
  audio.addEventListener('play', sync); audio.addEventListener('pause', sync);
  audio.addEventListener('timeupdate', () => { if (Math.floor(audio.currentTime) % 3 === 0) save(); });
  return audio;
}
function save(){ if (audio) store.set({ playing: wantPlaying, t: audio.currentTime, src: TRACK.src }); }
async function play(){
  if (!ensureAudio()) return false;
  wantPlaying = true;
  try { await audio.play(); save(); return true; } catch (e) { sync(); return false; }
}
function pause(){ if (!audio) return; wantPlaying = false; audio.pause(); save(); }
function toggle(){ (audio && !audio.paused) ? pause() : play(); }

function sync(){
  if (!btn) return;
  const on = !!audio && !audio.paused;
  btn.classList.toggle('playing', on);
  btn.setAttribute('aria-pressed', String(on));
  btn.querySelector('.sb-music-label').textContent = on ? 'Music on' : 'Music';
  btn.title = (on ? 'Pause music' : 'Play music') + (TRACK.title ? ' — ' + TRACK.title + (TRACK.artist ? ' · ' + TRACK.artist : '') : '') + (TRACK.credit ? '\n' + TRACK.credit : '');
}
function mountButton(){
  const right = document.querySelector('.status .status-right');
  if (!right || btn) return;
  btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'sb-item sb-music';
  btn.setAttribute('aria-label', 'Toggle background music');
  btn.innerHTML = '<span class="eq" aria-hidden="true"><i></i><i></i><i></i></span><span class="sb-music-label">Music</span>';
  btn.addEventListener('click', toggle);
  right.prepend(btn);
  sync();
}

window.SiteMusic = { enabled, play, pause, toggle, track: TRACK };
if (!enabled) return;

mountButton();
addEventListener('pagehide', save);

// Resume on later pages / reloads within the same visit.
const saved = store.get();
if (saved && saved.src && saved.src !== TRACK.src) saved.playing = false;
if (saved && saved.playing) {
  ensureAudio();
  wantPlaying = true;
  audio.currentTime = saved.t || 0;
  audio.play().then(sync).catch(() => {
    const resume = (e) => {
      removeEventListener('pointerdown', resume, true); removeEventListener('keydown', resume, true);
      if (e && e.target && e.target.closest && e.target.closest('.sb-music')) return; // the button's own click decides
      if (wantPlaying) play();
    };
    addEventListener('pointerdown', resume, true);
    addEventListener('keydown', resume, true);
  });
}
})();
