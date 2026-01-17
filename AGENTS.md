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

### Shop Categories & Items

#### ✨ Decorations (Make your chicken pretty!)
| Item | Price | Effect |
|------|-------|--------|
| 🌸 Flower Headband | $2 | +5 happiness |
| 🧥 Cozy Jumper | $3 | +5 happiness |
| 📿 Pearl Necklace | $2 | +5 happiness |
| 🏷️ Custom Nametag | $1 | +3 happiness |
| 🦆 Duck Disguise Kit | $3 | +8 happiness |
| 🐼 Panda Face Mask | $3 | +8 happiness |
| 🏴‍☠️ Pirate Eye Patch | $2 | +6 happiness |
| 🤨 Silly Eyebrows | $1 | +4 happiness |
| 😠 Angry Eyebrows | $1 | +4 happiness |
| 👒 Fancy Fascinator | $3 | +7 happiness |
| 🥰 Cute Face Kit | $2 | +6 happiness |
| 🦄 Unicorn Horn | $4 | +10 happiness |
| 🦸 Superhero Cape | $3 | +8 happiness |
| 🎀 Fancy Bow Tie | $2 | +5 happiness |
| 👑 Royal Crown | $5 | +12 happiness |

#### 💊 Health (Keep your chicken healthy!)
| Item | Price | Effect |
|------|-------|--------|
| 💊 Daily Vitamins | $2 | 30% slower hunger decay |
| ✨ Feather Polish | $2 | 30% slower cleanliness decay |
| 🌱 Growth Vitamin | $3 | +10 happiness |
| 💉 De-worm Tablets | $2 | 50% reduced sickness |

#### 🎮 Toys (Fun stuff to play with!)
| Item | Price | Effect |
|------|-------|--------|
| 🪱 Fake Worm | $1 | +5 happiness |
| 🤖 Robot Chicken Friend | $4 | 30% slower boredom |
| 📻 Chicken Walky-Talky | $3 | +8 happiness |
| 🖼️ Photo of Itself | $2 | +6 happiness |
| 🪞 Chicken Mirror | $2 | 20% slower boredom |

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
