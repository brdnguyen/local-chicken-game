# Changelog

All notable changes to the Virtual Chicken Game will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.16.0] - 2026-01-17

### Changed
- **Cuter kawaii-style chicken graphics** with Sanrio-inspired facial expressions!
  - Bigger oval eyes with multiple sparkle highlights for that "kawaii look"
  - Always-visible rosy cheeks on all chickens (pink blush gradient)
  - Rounded ellipse beaks instead of angular polygons
  - Enhanced happy expression with wider ∪ curves
  - Improved sick spiral eyes with proper swirl animation paths
  - Added eye gradient for depth and life

### Refactored
- **SVG code deduplication**: Moved all chicken SVG generation code to shared `chicken-svg.js`
  - Reduced index.html by ~940 lines of code
  - Reduced index-debug.html by ~470 lines of code
  - Both files now import shared code via `<script src="chicken-svg.js">`
  - Easier maintenance: update graphics in one place

## [0.15.1] - 2026-01-17

### Added
- **Debug gallery page** (`index-debug.html`) for viewing all SVG graphics
  - Breeds section: All 5 breeds at adult stage with color palettes
  - Life Stages section: Complete lifecycle from egg to mature chicken
  - Wearable Decorations section: All 14 decoration items on chickens
  - Expressions section: Happy, Normal, and Sick eye states
  - Silkie Special section: Fluffy breed through stages
  - Plymouth Rock section: Barred pattern breed through stages
  - Combination Examples section: Creative breed + decoration combos

## [0.15.0] - 2026-01-17

### Added
- **Beautiful custom SVG graphics** replacing emoji-based chicken display!
- Breed-specific appearance with unique colors:
  - ISA Brown: Warm brown tones
  - Silkie: Fluffy cream/beige with purple comb
  - Leghorn: Clean white with red comb
  - Plymouth Rock: Barred grey pattern
  - Orpington: Golden buff coloring
- Stage-based chicken rendering:
  - Egg: Beautiful shaded egg with spots
  - Hatching: Chick emerging from cracked shell
  - Chick stages: Adorable fluffy baby chickens
  - Adult stages: Full-grown chickens with combs and wattles
- **Wearable decorations** now appear ON the chicken SVG:
  - 🌸 Flower Headband: Colorful flower crown
  - 👑 Royal Crown: Golden crown with gems
  - 🧥 Cozy Jumper: Knitted sweater pattern
  - 📿 Pearl Necklace: String of pearls
  - 🎀 Bow Tie: Fancy pink bow
  - 🦸 Superhero Cape: Flowing red cape
  - 🦄 Unicorn Horn: Magical rainbow horn with sparkles
  - 🏴‍☠️ Pirate Eye Patch: Eye patch accessory
  - 👒 Fancy Fascinator: Elegant hat with feathers
  - 🦆 Duck Disguise: Duck bill overlay
  - 🐼 Panda Mask: Cute panda face
  - 🤨 Silly Eyebrows: Wavy eyebrows
  - 😠 Angry Eyebrows: V-shaped angry brows
  - 🥰 Cute Face Kit: Rosy cheeks and sparkly eyes
- Expression-based eye rendering:
  - Happy eyes (curved) when happiness > 70%
  - Sick spiral eyes when chicken is ill
  - Normal eyes otherwise
- Drop shadows and smooth animations for SVG graphics

### Changed
- Tips section at the top of the main screen (Chicken tab)
- Helpful tip for first-time users about caring actions
- Animated glow effect on tips to draw attention
- Cute styling with dashed yellow border

## [0.14.0] - 2026-01-17

### Added
- Secret reset feature: Tap the QR code in the Share tab 5 times to trigger a complete game reset
- Confirmation dialog before reset to prevent accidental data loss
- Resets chicken, inventory, friends list, and money back to starting values

## [0.13.0] - 2026-01-17

### Fixed
- Chicken lifecycle graphics now show correct progression:
  - 🥚 Egg (Day 0) - Plain egg
  - 🐣 Hatching (Day 20) - Chick breaking out of shell
  - 🐤 One Week Old (Day 27) - Baby chick
  - 🐥 Fluffy Chick (Day 40) - Growing chick
  - Then 🐔 stages for older chickens

## [0.12.0] - 2026-01-17

### Added
- Decorations now display visually on the chicken when purchased!
- Up to 8 decoration emojis appear above the chicken
- Decorations include: 🌸🧶💎🏷️🦆🐼☠️🥸😤🎩✨🦄🦸🎀👑

### Changed
- Accessories display repositioned to top-center above chicken
- Improved decoration emoji layout with wrapping support

## [0.11.0] - 2026-01-17

### Changed
- Money reward logic: $1 only awarded when health status COLOR changes
  - Red (<40%) → Yellow (≥40%)
  - Yellow (<60%) → Green (≥60%)
- Up arrow ⬆️ now appears in Overall Health box (not individual bars)
- Encouraging message when no color upgrade: "Keep caring to improve my health status!"

## [0.10.0] - 2026-01-17

### Changed
- Money (+$1) is now only earned when caring actions actually improve health
- If a need is already at 100%, no money is awarded

### Added
- Bouncing ⬆️ arrow indicator on health bars when needs improve
- Encouraging message: "📈 My health improves! Thanks for caring for me! 💕"
- Message when no improvement: "Already at max! No money earned."

## [0.9.0] - 2026-01-17

### Changed
- Simplified time passing: each caring action now adds 5 virtual days directly
- Removed complex "2 actions = 10 days" counter system
- Updated UI to show "✨ Each caring action advances time by +5 days"

## [0.8.0] - 2026-01-17

### Added
- Daily usage quota system (10 actions per calendar day)
- Duplicate action tracker below Caring Actions for visibility
- Remaining quota displayed in popup after each action
- Secret reset for testing (tap Overall Health 5 times)

## [0.7.0] - 2026-01-17

### Added
- Health indicators display with progress bars for all 6 needs
- Overall Health percentage (average of all needs)
- Color-coded indicators (green/yellow/red)
- Pulsing animation for critical levels

## [0.6.0] - 2026-01-17

### Added
- Shop category system (Decorations, Health, Toys)
- 15 decoration items (headband, jumper, necklace, nametag, duck kit, panda face, eye patch, eyebrows, fascinator, cute face kit, unicorn horn, superhero cape, bow tie, crown)
- 4 health items (vitamins, feather polish, growth vitamin, de-worm tablets)
- 5 toy items (fake worm, robot friend, walky-talky, photo, mirror)
- Item effects (decay reduction, happiness boosts, sick reduction)

## [0.5.0] - 2026-01-17

### Fixed
- Bug where friend list became empty when adding a duplicate friend
- Friends array persistence issues

## [0.4.0] - 2026-01-17

### Added
- Virtual time system (2 actions = 10 virtual days)
- Scaled milestone progression for better gameplay pacing
- Action counter display showing progress to next time skip

## [0.3.0] - 2026-01-17

### Changed
- Replaced ASCII art with cute emoji graphics
- Added emoji-based chicken stages (🥚→🐣→🐤→🐥→🐔→🐓)
- Added mood indicators and accessories display
- Ground decoration with emoji

## [0.2.0] - 2026-01-17

### Added
- PWA (Progressive Web App) support
- Service Worker for offline functionality
- Persistent storage API to prevent iOS localStorage eviction
- Add to Home Screen capability

## [0.1.0] - 2026-01-17

### Added
- Initial game release
- Chicken creation with name, owner, and breed selection
- 5 chicken breeds (ISA Brown, Silkie, Leghorn, Plymouth Rock, Orpington)
- 10 lifecycle milestones (Egg to One Year Old)
- 6 health needs (hunger, thirst, cleanliness, sleep, happiness, exercise)
- 6 caring actions (Feed, Water, Dust Bath, Play, Sleep, Flap)
- Basic shop with purchasable items
- Economy system ($5 start, earn $1 per action)
- QR code sharing system for adding friends
- Camera scanning for QR codes
- Friend list with chicken details
- localStorage persistence
