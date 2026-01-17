# Changelog

All notable changes to the Virtual Chicken Game will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
