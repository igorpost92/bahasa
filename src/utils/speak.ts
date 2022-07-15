export const speak = (text: string) => {
  const voice = window.speechSynthesis.getVoices().find(i => i.lang === 'id-ID');

  if (!voice) {
    alert('no voice found');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
};
