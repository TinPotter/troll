const audio = document.getElementById("sound");
const gate  = document.getElementById("gate");
const btn   = document.getElementById("startButton");

// Configure playback
audio.volume = 1.0;   // full volume inside the browser tab (NOT system volume)
audio.loop   = true;

// Try muted autoplay (allowed by browsers). We'll unmute on first gesture.
(async () => {
  try {
    audio.muted = true;
    await audio.play();
    // Waiting for the first user gesture to unmute
  } catch { /* Autoplay may be blocked – that's fine; we show the gate */ }
})();

// Start playing (unmuted) on first user gesture
async function startSound() {
  try {
    audio.muted = false;
    if (audio.paused) await audio.play();
    gate.classList.add("hidden");
  } catch (err) {
    alert("Could not play audio. Check Sounds/sound1.mp3 exists and try again.");
    console.error(err);
  } finally {
    // Ensure we remove the once-only global listener either way
    window.removeEventListener("pointerdown", startSoundOnce, { capture: true });
  }
}

const startSoundOnce = () => startSound();
btn.addEventListener("click", startSound);
window.addEventListener("pointerdown", startSoundOnce, { capture: true, once: true });
