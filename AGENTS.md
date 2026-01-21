# My Virtual Chicken Game - Agent Reference

## Overview
A cute virtual chicken game for kids (8-12 year old) that runs as a local HTML file in any browser (including mobile Safari on iPhone).

## Game Mechanics

### Time System
- **Virtual Days**: Time passes through actions, not real time
- **Each caring action = 5 virtual days pass**
- Actions: Feed, Water, Dust Bath, Play, Sleep, Flap

### Chicken Lifecycle Milestones

| Day | Stage | Emoji | Description |
|-----|-------|-------|-------------|
| 0 | Egg | 🥚 | Starting stage |
| 20 | Hatching! | 🐣 | Chick breaking out of shell |
| 27 | One Week Old | 🐤 | Baby chick |
| 40 | Fluffy Chick | 🐥 | Growing chick |
| 50 | One Month Old | 🐔 | Young pullet |
| 80 | Two Months Old | 🐔 | Growing pullet |
| 110 | Three Months Old | 🐔 | Teenager |
| 150 | First Egg! | 🥚 | Laying hen |
| 180 | Six Months Old | 🐓 | Adult chicken |
| 365 | One Year Old! | 🎂 | Mature chicken |

### Health Statuses
- 😊 Happy
- 🍽️ Hungry (needs < 40%)
- 💧 Thirsty (needs < 40%)
- 🛁 Needs Dust Bath (cleanliness < 40%)
- 😴 Sleepy (sleep < 40%)
- 🪽 Wants to Flap (exercise < 40%)
- 🤒 Sick (random chance when needs are low)
- 😐 Bored (happiness < 40%)

### Health Indicators Display
Visual progress bars show real-time percentages for each need:
| Indicator | Icon | Description |
|-----------|------|-------------|
| Hunger | 🌾 | How full your chicken is |
| Thirst | 💧 | Hydration level |
| Cleanliness | 🛁 | How clean (needs dust bath when low) |
| Sleep | 😴 | Energy/rest level |
| Happiness | 😊 | Overall mood |
| Exercise | 🦶 | Physical activity needs |

**Color coding:**
- 🟢 Green (60-100%): Healthy
- 🟡 Yellow (40-59%): Warning
- 🔴 Red (0-39%): Critical (pulsing animation)

### Health Decay System
Needs decrease in **real-time** only while the user is **actively on the page**.

#### Session-Based Decay
- **Time only counts when page is visible** (uses Page Visibility API)
- **Maximum session: 10 minutes** - timer stops after 10 mins, decay pauses
- **Timer resets on page load** - leaving and returning starts fresh
- **Pauses when**: tab is hidden, window loses focus, app is quit

#### Session Timer Display
A real-time clock (MM:SS format) is shown near Overall Health:
- ⏱️ **Red pulsing** (00:00-02:00): Fast decay period
- ⏱️ **Blue** (02:00-10:00): Normal decay period
- ⏱️ **Grey** (10:00): Stopped - come back later!

#### Decay Rates

**Fast period (first 2 minutes):** 3x normal speed for visible feedback

| Need | Base Rate/sec | Fast Rate/sec | Notes |
|------|---------------|---------------|-------|
| Hunger | 0.05 | 0.15 | Standard rate |
| Thirst | 0.06 | 0.18 | Fastest decay! |
| Sleep | 0.02 | 0.06 | Slow decay |
| Happiness | 0.01 | 0.03 | Slowest decay |
| Cleanliness | 0.015 | 0.045 | Slow decay |
| Exercise | 0.015 | 0.045 | Slow decay |

**Shop items that reduce decay:**
| Item | Effect |
|------|--------|
| 💊 Daily Vitamins | 30% slower hunger decay |
| ✨ Feather Polish | 30% slower cleanliness decay |
| 🤖 Robot Chicken Friend | 30% slower happiness decay |
| 🪞 Chicken Mirror | 20% slower happiness decay |

#### Visual & Audio Feedback
When decay causes a visible change:
- 🔊 **Sound effect**: Soft descending tone (throttled to every 3 seconds)
- ✨ **Bar flash animation**: Brightness pulse on the health bar
- 📳 **Shake animation**: Indicator row shakes briefly

**Sickness mechanic:**
- When average of all needs < 30%, there's a small chance of getting sick
- 💉 De-worm Tablets reduce sickness chance by 50%
- Sleep action has 30% chance to cure sickness

### Breeds Available
Each breed has unique custom SVG graphics with breed-specific colors:

| Breed | Body Color | Special Features |
|-------|------------|------------------|
| ISA Brown | Warm brown (#8B4513) | Classic farm chicken look |
| Silkie | Cream/Beige (#F5F5DC) | Fluffy texture, purple comb |
| Leghorn | Pure white (#FFFFFF) | Bright red comb |
| Plymouth Rock | Grey (#606060) | Barred pattern stripes |
| Orpington | Golden buff (#DAA520) | Rich golden feathers |

### Graphics System
The game uses **custom SVG graphics** that combine:
- **Breed-specific coloring**: Each breed has unique body, wing, comb, wattle, beak, and feet colors
- **Life stage rendering**: Different SVG artwork for egg, hatching, chick, and adult stages
- **Wearable decorations**: Shop items visually appear ON the chicken
- **Expressive eyes**: Happy (curved), sick (spiral), or normal based on health
- **Smooth animations**: Bounce, wobble, and sleep animations via CSS

#### Wearable Decorations (rendered on chicken)
| Item | Visual Effect |
|------|---------------|
| 🌸 Flower Headband | Flower crown with pink blooms |
| 👑 Royal Crown | Golden crown with gems |
| 🧥 Cozy Jumper | Knitted sweater pattern |
| 📿 Pearl Necklace | String of white pearls |
| 🎀 Bow Tie | Pink bow at neck |
| 🦸 Superhero Cape | Red flowing cape |
| 🦄 Unicorn Horn | Rainbow horn with sparkles |
| 🏴‍☠️ Pirate Eye Patch | Black eye patch |
| 👒 Fancy Fascinator | Purple hat with feathers |
| 🦆 Duck Disguise | Orange duck bill |
| 🐼 Panda Mask | Black and white panda face |
| 🤨 Silly Eyebrows | Wavy curved brows |
| 😠 Angry Eyebrows | V-shaped angry brows |
| 🥰 Cute Face Kit | Rosy cheeks, sparkly eyes |

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
- Start with $5 (Bank Balance)
- **All money goes to the POT first** - only pot payouts update bank balance!
- Caring actions that improve health add +$1 to pot (not bank)
- Visual feedback: ⬆️ arrow on improved health bars, pot growth animation
- Money to pot awarded when color status changes: Red→Yellow or Yellow→Green

### Money Pot System 🏺
The Money Pot is the **primary way to earn money**! All earnings flow through the pot.

#### How It Works
- **Caring actions that improve health**: +$1 added to pot instantly
- **Pot also fills based on health status** while actively playing:
  - 💚 **Green bars (≥60%)**: Pot grows (+$0.00025/second per green bar)
  - 💛 **Yellow bars (40-59%)**: No change
  - ❤️ **Red bars (<40%)**: Pot shrinks (-$0.00015/second per red bar)
  - 🤒 **Sick chicken**: Pot is **frozen** (no growth/shrink)
  
- **Payday every 20 virtual days!** (Day 20, 40, 60, etc.)
  - Pot empties into bank balance
  - Celebration popup shows payout
  - Pot resets to $0

- **Maximum pot value**: $5.00 (excludes bonuses)

#### Bonus Rewards
| Action | Bonus |
|--------|-------|
| 👥 Add a new friend | +$0.50 to pot |
| 🧹 Complete house chores | +$1.00 to pot |

#### Inactivity Penalty
- **2 days without playing** = Pot resets to $0!
- Warning shown on return

#### Visual Elements
- 🏺 Pot display shows current value
- Pot glows when growing
- Pot shrinks animation when losing money
- Frozen/grey appearance when chicken is sick
- ❓ Help button explains the system

### Daily Usage Quota
- **Maximum 10 actions per calendar day** (to prevent excessive use by kids!)
- Actions include: caring actions (feed, water, etc.) and shop purchases
- Counter resets at midnight (local time)
- Display shows remaining actions: ⚡ X/10 today (or X/12 if bonus earned)
- Visual indicators:
  - Blue: Normal (4+ actions remaining)
  - Red/pulsing: Low (1-3 actions remaining)
  - Grey: Empty (0 actions - come back tomorrow!)

### House Chore Challenge 🧹
Earn **+2 bonus actions per day** by completing real-world chores!

#### How It Works
1. **Parent Registration** (one-time setup)
   - Parent takes a face photo using the device camera
   - Face data is stored locally as a color histogram signature
   - Used for verification when approving chores

2. **Record Chores** (child does this)
   - Complete 2 real-world chores (~5 minutes each)
   - Write down what you did with a title and description
   - Chores must be meaningful (not too small)

3. **Parent Approval**
   - Parent reviews the recorded chores
   - Verifies identity using face recognition
   - If approved, child earns +2 bonus actions for the day

#### Accepted Chores (Examples)
| Chore | Description |
|-------|-------------|
| 🧹 Tidy up a room | Clean and organize a space |
| 🌿 Water the garden | Care for plants |
| 🍽️ Wash the dishes | Clean up after meals |
| 📚 Study hard | Focus on schoolwork |
| 🛏️ Make your bed | Keep bedroom tidy |
| 🗑️ Take out the trash | Help with household duties |

#### Face Recognition System
Uses simple heuristics implemented in JavaScript (no external APIs):
- **Color histograms**: RGB channel distribution (16 bins each)
- **Region analysis**: 3x3 grid average colors
- **Brightness metrics**: Average and variance
- **Match threshold**: 55% similarity required
- **Privacy**: All data stored locally, never transmitted

#### State Management
```javascript
// Added to gameState
parentFaceData: null,        // Face histogram signature
parentPhotoDataUrl: null,    // Small preview image
pendingChores: [],           // [{title, desc, addedAt}]
bonusActionsEarned: 0,       // 0, 1, or 2
bonusActionsDate: null       // Resets daily
```

#### Daily Reset
- Bonus actions reset at midnight (local time)
- Pending chores are cleared when bonus is earned or day changes
- Parent registration persists (one-time setup)

### Money Pot State Management
```javascript
// Added to gameState (v0.18.0)
moneyPot: 0,                 // Current pot value in dollars
lastEarningEventDay: 0,      // Virtual day of last earning event payout
lastActivityDate: null,      // Date string of last activity (for inactivity reset)
potBonusToday: 0,            // Track bonus pot additions today
badges: []                   // Array of earned badge IDs (future feature)
```

## Technical Features

### Data Persistence
- Uses localStorage with key `"chickenGame"`
- PWA support for iOS to prevent data eviction
- Service Worker registered for app-like behavior
- Persistent storage API requested

### Secret Reset
- **Tap the QR code in the Share tab 5 times** to trigger a complete game reset
- Confirmation dialog prevents accidental resets
- Resets: chicken, inventory, friends list, and money back to $5
- Tap counter resets after 3 seconds of inactivity

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
