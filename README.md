# SafeHaven — Browser JRPG Foundation

A dependency-free HTML5/Canvas browser JRPG inspired by the pacing and systems philosophy of 16-bit console RPGs, using original characters, locations, enemies and terminology.

## Play
Open `index.html` directly in a modern browser, or serve the repository as a static site. No Vite or npm build is required.

### Controls
- Move: Arrow keys / WASD
- Confirm / interact: Enter / Z
- Cancel: Escape / X
- Menu: M
- Touch: on-screen D-pad, A, B and MENU

## Milestone content
- Title screen, new game, continue/load and visible boot error handling
- Kael's home and interactive objects
- Eldenbrook with NPCs, shops, inn and side quests
- Eldenbrook Vale overworld and terrain encounters
- Whisperwood Cave, treasure, healing spring, save crystal and Stoneback boss
- Turn-based battles with Attack, Fire magic, Potion, Defend and Flee
- XP, character levels, JP, job levels, gold and drops
- Inventory, equipment, status, jobs, quests and bestiary menus
- Persistent localStorage autosave + manual Slot 1 save
- Desktop and touch controls

## Save data
Save key: `safehaven.jrpg.v1`. Saves include map/position, player progression, inventory, equipment, gold, quests, flags, chest state, bestiary, settings and playtime.

## Deployment
All paths are relative. The project can be hosted from GitHub Pages, Cloudflare Pages or any static web host without a build step.

## Known limitations
This is the first playable foundation, not the full 30–50 hour campaign. Party members beyond Kael, job switching, additional spell schools, multiple save-slot UI selection, richer art/audio assets and later continents are expansion work.