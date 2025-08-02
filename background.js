let lastUrl = "";

const judgments = {
  "youtube.com": [
    "Still pretending you're being productive here?",
    "Your screen time called. It’s crying.",
    "This is your 6th cat video today. Impressive."
  ],
  "instagram.com": [
    "Scrolling like your life depends on it.",
    "You liked that post 0.3 seconds too fast.",
    "Another influencer? Another crisis incoming."
  ],
  "facebook.com": [
    "Looking at memes from 2014?",
    "Commenting 'so true' doesn’t fix your problems."
  ],
  "twitter.com": [
    "Arguing with strangers builds character, right?",
    "Another hot take? Groundbreaking."
  ],
  "linkedin.com": [
    "You updated your title to 'Visionary'? Bold.",
    "Networking or just creeping?"
  ],
  "reddit.com": [
    "You promised just one post. Liar.",
    "You’re now an expert in quantum physics, dogs, and IKEA."
  ],
  "netflix.com": [
    "Another ‘one last episode’?",
    "Your popcorn is more productive than you."
  ],
  "amazon.in": [
    "Buying things you don’t need for a future that won’t come.",
    "That cart is a cry for help."
  ],
  "flipkart.com": [
    "Hunting deals like it's the stock market.",
    "No, you don’t need another toaster."
  ],
  "quora.com": [
    "Asking strangers life advice again?",
    "Quora called. It wants you to go outside."
  ],
  "stackoverflow.com": [
    "Copy-pasting code like a pro!",
    "You broke it, Googled it, and now you’re here."
  ],
  "github.com": [
    "Looking at code you’ll never run.",
    "That repo you starred? Never cloned."
  ],
  "wikipedia.org": [
    "From World War II to capybaras in 5 clicks.",
    "How did you get here from 'how to boil eggs'?"
  ],
  "openai.com": [
    "Hoping ChatGPT solves your life now?",
    "Even AI is tired of your procrastination."
  ],
  "google.com": [
    "You Googled 'how to focus' again, didn’t you?",
    "Page 2 of search results? You're truly lost."
  ],
  "default": [
    "Browsing like no one’s watching. Except me.",
    "This tab? Questionable choice.",
    "You clicked it, now you deal with it."
  ]
};

function getJudgmentMessage(url) {
  for (const key in judgments) {
    if (url.includes(key)) {
      const list = judgments[key];
      return list[Math.floor(Math.random() * list.length)];
    }
  }
  const defList = judgments["default"];
  return defList[Math.floor(Math.random() * defList.length)];
}

function playRandomSound() {
  const sounds = ["beep", "goat"];
  const sound = sounds[Math.floor(Math.random() * sounds.length)];
  const audio = new Audio(chrome.runtime.getURL(`sounds/${sound}.mp3`));
  audio.play().catch(e => console.warn("Sound failed:", e));
}

setInterval(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab || !tab.url) return;

    const message = getJudgmentMessage(tab.url);

    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "🙃 JudgyTab Thinks:",
      message: message
    });

    playRandomSound();
  });
}, 10000); // every 10 seconds
