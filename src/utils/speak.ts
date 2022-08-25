export const speak = (text: string, lang: string) => {
  const regex = new RegExp(`^${lang.toLowerCase()}-`, 'i');

  const voices = window.speechSynthesis.getVoices().filter(i => regex.test(i.lang) && i.localService);
  // console.log(voices);

  // TODO: spanish has 5
  const voice = voices[voices.length - 1];

  if (!voice) {
    alert('no voice found');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
};
