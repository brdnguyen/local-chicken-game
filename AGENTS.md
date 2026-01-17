# My Virtual Chicken Game - Agent Reference

## Overview
A cute virtual chicken game for kids (8-12 year old) that runs as a local HTML file in any browser (including mobile Safari on iPhone).

## Game Mechanics

### Time System
- **Virtual Days**: Time passes through actions, not real time
- **Every 2 actions = 10 virtual days pass**
- Actions: Feed, Water, Dust Bath, Play, Sleep, Flap

### Chicken Lifecycle Milestones

| Day | Stage | Emoji | Description |
|-----|-------|-------|-------------|
| 0 | Egg | 🥚 | Starting stage |
| 20 | Hatching! | 🐣 | Egg is cracking |
| 27 | One Week Old | 🐤 | Baby chick emerges |
| 40 | Fluffy Chick | 🐥 | Growing chick |
| 50 | One Month Old | 🐔 | Young pullet |
| 80 | Two Months Old | 🐔 | Adolescent |
| 110 | Three Months Old | 🐔 | Teenager |
| 150 | First Egg! | 🐔🥚 | Laying hen |
| 180 | Six Months Old | 🐓 | Adult chicken |
| 365 | One Year Old! | 🐔⭐ | Mature chicken |

### Health Statuses
- 😊 Happy
- 🍽️ Hungry (needs < 40%)
- 💧 Thirsty (needs < 40%)
- 🛁 Needs Dust Bath (cleanliness < 40%)
- 😴 Sleepy (sleep < 40%)
- 🪽 Wants to Flap (exercise < 40%)
- 🤒 Sick (random chance when needs are low)
- 😐 Bored (happiness < 40%)

### Breeds Available
- ISA Brown
- Silkie
- Leghorn
- Plymouth Rock
- Orpington

### Shop Items ($1 each)
- 🥚 Fake Chicken Eggs - +10 happiness
- 🥤 Cup & Water Set - 30% slower thirst decay
- 🌻 Fancy Seeds - 30% slower hunger decay
- 🎀 Chicken Toy - 30% slower happiness decay

### Economy
- Start with $5
- Earn $1 per action (taking care of chicken)

## Technical Features

### Data Persistence
- Uses localStorage with key `"chickenGame"`
- PWA support for iOS to prevent data eviction
- Service Worker registered for app-like behavior
- Persistent storage API requested

### Friend System
- QR code generated with chicken data (encoded as base64)
- Format: `CHKN` + URL-safe base64 encoded JSON
- Camera scanning supported via jsQR library
- Manual code paste also supported

### Chicken Code Data Structure
```json
{
  "n": "chicken name",
  "o": "owner name",
  "b": "breed id",
  "a": "age in days",
  "s": "current stage",
  "h": "health percentage",
  "i": "unique chicken id"
}
```

## File Structure
- `index.html` - Single-file game (includes all CSS, JS, and embedded libraries)
- `AGENTS.md` - This documentation file
- `PROMPTS.md` - Original requirements and wishlist
