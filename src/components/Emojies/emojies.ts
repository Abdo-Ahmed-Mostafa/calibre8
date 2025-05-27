export type EmojiCategory =
  | "All"
  | "Smileys & Emotion"
  | "People & Body"
  | "Animals & Nature"
  | "Food & Drink"
  | "Travel & Places"
  | "Activities"
  | "Objects"
  | "Symbols"
  | "Flags";

export interface EmojiItem {
  symbol: string;
  name: string;
  category: EmojiCategory;
}

export const emojis: EmojiItem[] = [
  // Smileys & Emotion
  { symbol: "😀", name: "Grinning Face", category: "Smileys & Emotion" },
  {
    symbol: "😂",
    name: "Face with Tears of Joy",
    category: "Smileys & Emotion",
  },
  {
    symbol: "😍",
    name: "Smiling Face with Heart-Eyes",
    category: "Smileys & Emotion",
  },
  {
    symbol: "😎",
    name: "Smiling Face with Sunglasses",
    category: "Smileys & Emotion",
  },

  // People & Body
  { symbol: "👋", name: "Waving Hand", category: "People & Body" },
  { symbol: "👍", name: "Thumbs Up", category: "People & Body" },
  { symbol: "🙏", name: "Folded Hands", category: "People & Body" },

  // Animals & Nature
  { symbol: "🐶", name: "Dog Face", category: "Animals & Nature" },
  { symbol: "🐱", name: "Cat Face", category: "Animals & Nature" },
  { symbol: "🦁", name: "Lion Face", category: "Animals & Nature" },
  { symbol: "🐸", name: "Frog Face", category: "Animals & Nature" },

  // Food & Drink
  { symbol: "🍎", name: "Red Apple", category: "Food & Drink" },
  { symbol: "🍕", name: "Pizza", category: "Food & Drink" },
  { symbol: "🍩", name: "Doughnut", category: "Food & Drink" },
  { symbol: "☕", name: "Hot Beverage", category: "Food & Drink" },

  // Travel & Places
  { symbol: "🚗", name: "Automobile", category: "Travel & Places" },
  { symbol: "✈️", name: "Airplane", category: "Travel & Places" },
  { symbol: "🏝️", name: "Desert Island", category: "Travel & Places" },

  // Activities
  { symbol: "⚽", name: "Soccer Ball", category: "Activities" },
  { symbol: "🎸", name: "Guitar", category: "Activities" },
  { symbol: "🎮", name: "Video Game", category: "Activities" },

  // Objects
  { symbol: "📱", name: "Mobile Phone", category: "Objects" },
  { symbol: "💡", name: "Light Bulb", category: "Objects" },
  { symbol: "🎁", name: "Wrapped Gift", category: "Objects" },

  // Symbols
  { symbol: "❤️", name: "Red Heart", category: "Symbols" },
  { symbol: "☮️", name: "Peace Symbol", category: "Symbols" },
  { symbol: "⚠️", name: "Warning", category: "Symbols" },

  // Flags
  { symbol: "🇺🇸", name: "United States Flag", category: "Flags" },
  { symbol: "🇫🇷", name: "France Flag", category: "Flags" },
  { symbol: "🇯🇵", name: "Japan Flag", category: "Flags" },
];
