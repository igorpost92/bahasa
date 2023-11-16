const predefinedVoices: Record<string, string | undefined> = {
  EN: 'karen',
  ES: 'paulina',
};

const getVoicesByLang = (lang: string) => {
  const regex = new RegExp(`^${lang.toLowerCase()}-`, 'i');

  const voices = window.speechSynthesis
    .getVoices()
    .filter(i => regex.test(i.lang) && i.localService);

  return voices;
};

export const speak = (text: string, lang: string) => {
  const voices = getVoicesByLang(lang);

  if (!voices.length) {
    alert('No voices found');
    return;
  }

  const predefinedVoiceName = predefinedVoices[lang];
  const predefinedVoice = predefinedVoiceName
    ? voices.find(voice => voice.name.toLowerCase().includes(predefinedVoiceName.toLowerCase()))
    : undefined;

  const voice = predefinedVoice ?? voices[0];

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
};
