# Perigon Color System

A comprehensive color palette designed specifically for the Perigon application with full light and dark mode support. The system provides semantic color naming, consistent contrast ratios, and flexible implementation patterns using CSS custom properties.

## Color Architecture

### Technical Implementation

Colors are defined as RGB values in CSS custom properties to enable alpha transparency:

```css
:root {
  /* Example: Perigon Neutral */
  --color-pg-neutral-500: 80, 80, 80;

  /* Usage with solid color */
  background-color: rgb(var(--color-pg-neutral-500));

  /* Usage with transparency */
  background-color: rgba(var(--color-pg-neutral-500), 0.5);
}
```

### Tailwind Integration

Colors are integrated into Tailwind using the `getPalette` utility function:

```javascript
const getPalette = (group, prefix, getColorValue = getColor) =>
  group.reduce((palette, item) => {
    palette[item] = getColorValue(prefix + item);
    return palette;
  }, {});
```

## Core Color Palettes

### Perigon Neutral (pgNeutral)

The foundation grayscale for text, backgrounds, and borders:

| Token           | Light RGB     | Dark RGB      | Hex (Light) | Usage                 |
| --------------- | ------------- | ------------- | ----------- | --------------------- |
| `pgNeutral-0`   | 255, 255, 255 | 255, 255, 255 | #FFFFFF     | Pure white            |
| `pgNeutral-50`  | 251, 251, 249 | 251, 251, 249 | #FBFBF9     | Off-white backgrounds |
| `pgNeutral-100` | 246, 246, 244 | 246, 246, 244 | #F6F6F4     | Light backgrounds     |
| `pgNeutral-200` | 228, 228, 228 | 228, 228, 228 | #E4E4E4     | Borders, dividers     |
| `pgNeutral-300` | 157, 157, 157 | 157, 157, 157 | #9D9D9D     | Strong borders        |
| `pgNeutral-400` | 130, 130, 130 | 130, 130, 130 | #828282     | Placeholder text      |
| `pgNeutral-500` | 80, 80, 80    | 80, 80, 80    | #505050     | Secondary text        |
| `pgNeutral-600` | 69, 69, 69    | 69, 69, 69    | #454545     | Primary text          |
| `pgNeutral-700` | 48, 48, 48    | 48, 48, 48    | #303030     | Strong text           |
| `pgNeutral-800` | 45, 45, 45    | 45, 45, 45    | #2D2D2D     | High contrast text    |
| `pgNeutral-900` | 31, 31, 31    | 31, 31, 31    | #1F1F1F     | Maximum contrast      |
| `pgNeutral-950` | 18, 18, 18    | 18, 18, 18    | #121212     | Pure black            |

```css
/* Usage Examples */
.bg-pgNeutral-100 {
  background-color: rgb(var(--color-pg-neutral-100));
}
.text-pgNeutral-950 {
  color: rgb(var(--color-pg-neutral-950));
}
.border-pgNeutral-200 {
  border-color: rgb(var(--color-pg-neutral-200));
}
```

### Perigon Blue (pgBlue)

Primary brand color for interactive elements:

| Token        | RGB Values    | Hex     | Usage                |
| ------------ | ------------- | ------- | -------------------- |
| `pgBlue-50`  | 235, 241, 255 | #EBF1FF | Light backgrounds    |
| `pgBlue-100` | 213, 226, 255 | #D5E2FF | Subtle tints         |
| `pgBlue-200` | 192, 213, 255 | #C0D5FF | Light borders        |
| `pgBlue-300` | 151, 186, 255 | #97BAFF | Medium accents       |
| `pgBlue-400` | 104, 149, 255 | #6895FF | Interactive elements |
| `pgBlue-500` | 51, 92, 255   | #335CFF | Primary buttons      |
| `pgBlue-600` | 53, 89, 233   | #3559E9 | Hover states         |
| `pgBlue-700` | 37, 71, 208   | #2547D0 | Active states        |
| `pgBlue-800` | 31, 59, 173   | #1F3BAD | Strong emphasis      |
| `pgBlue-900` | 24, 47, 139   | #182F8B | Maximum contrast     |
| `pgBlue-950` | 18, 35, 104   | #122368 | Deep blue            |

### Perigon Sapphire (pgSapphire)

Secondary blue for information and accents:

| Token            | RGB Values    | Hex     | Usage                |
| ---------------- | ------------- | ------- | -------------------- |
| `pgSapphire-50`  | 239, 250, 252 | #EFFAFC | Info backgrounds     |
| `pgSapphire-100` | 214, 242, 247 | #D6F2F7 | Light info states    |
| `pgSapphire-200` | 178, 228, 239 | #B2E4EF | Info borders         |
| `pgSapphire-300` | 125, 207, 227 | #7DCFE3 | Info accents         |
| `pgSapphire-400` | 64, 178, 208  | #40B2D0 | Info buttons         |
| `pgSapphire-450` | 52, 179, 226  | #34B3E2 | Special info variant |
| `pgSapphire-500` | 36, 149, 182  | #2495B6 | Info primary         |
| `pgSapphire-600` | 34, 124, 157  | #227C9D | Info hover           |
| `pgSapphire-700` | 33, 98, 125   | #21627D | Info active          |
| `pgSapphire-800` | 35, 82, 103   | #235267 | Info strong          |
| `pgSapphire-900` | 33, 69, 88    | #214558 | Info maximum         |
| `pgSapphire-950` | 17, 44, 59    | #112C3B | Info deep            |

### Perigon Green (pgGreen)

Success and positive states:

| Token         | RGB Values    | Hex     | Usage                |
| ------------- | ------------- | ------- | -------------------- |
| `pgGreen-50`  | 241, 252, 243 | #F1FCF3 | Success backgrounds  |
| `pgGreen-100` | 223, 249, 229 | #DFF9E5 | Light success states |
| `pgGreen-200` | 192, 242, 202 | #C0F2CA | Success borders      |
| `pgGreen-300` | 143, 230, 162 | #8FE6A2 | Success accents      |
| `pgGreen-400` | 86, 210, 115  | #56D273 | Success buttons      |
| `pgGreen-500` | 47, 184, 80   | #2FB850 | Success primary      |
| `pgGreen-600` | 35, 147, 64   | #239340 | Success hover        |
| `pgGreen-700` | 30, 119, 51   | #1E7733 | Success active       |
| `pgGreen-800` | 28, 95, 45    | #1C5F2D | Success strong       |
| `pgGreen-900` | 25, 78, 39    | #194E27 | Success maximum      |
| `pgGreen-950` | 8, 43, 18     | #082B12 | Success deep         |

### Perigon Red (pgRed)

Error and destructive states:

| Token       | RGB Values    | Hex     | Usage              |
| ----------- | ------------- | ------- | ------------------ |
| `pgRed-50`  | 255, 242, 240 | #FFF2F0 | Error backgrounds  |
| `pgRed-100` | 255, 227, 222 | #FFE3DE | Light error states |
| `pgRed-200` | 255, 204, 195 | #FFCCC3 | Error borders      |
| `pgRed-300` | 255, 169, 153 | #FFA999 | Error accents      |
| `pgRed-400` | 255, 119, 94  | #FF775E | Error buttons      |
| `pgRed-500` | 255, 76, 44   | #FF4C2C | Error primary      |
| `pgRed-600` | 237, 44, 9    | #ED2C09 | Error hover        |
| `pgRed-700` | 196, 29, 10   | #C41D0A | Error active       |
| `pgRed-800` | 156, 25, 16   | #9C1910 | Error strong       |
| `pgRed-900` | 125, 24, 17   | #7D1811 | Error maximum      |
| `pgRed-950` | 68, 8, 6      | #440806 | Error deep         |

### Perigon Orange (pgOrange)

Warning and attention states:

| Token          | RGB Values    | Hex     | Usage                |
| -------------- | ------------- | ------- | -------------------- |
| `pgOrange-50`  | 255, 241, 235 | #FFF1EB | Warning backgrounds  |
| `pgOrange-100` | 255, 227, 213 | #FFE3D5 | Light warning states |
| `pgOrange-200` | 255, 213, 192 | #FFD5C0 | Warning borders      |
| `pgOrange-300` | 255, 186, 151 | #FFBA97 | Warning accents      |
| `pgOrange-400` | 255, 154, 104 | #FF9A68 | Warning buttons      |
| `pgOrange-500` | 255, 132, 71  | #FF8447 | Warning primary      |
| `pgOrange-600` | 233, 113, 53  | #E97135 | Warning hover        |
| `pgOrange-700` | 208, 94, 37   | #D05E25 | Warning active       |
| `pgOrange-800` | 173, 78, 31   | #AD4E1F | Warning strong       |
| `pgOrange-900` | 139, 62, 24   | #8B3E18 | Warning maximum      |
| `pgOrange-950` | 104, 47, 18   | #682F12 | Warning deep         |

### Perigon Gold (pgGold)

Accent and highlight states:

| Token        | RGB Values    | Hex     | Usage             |
| ------------ | ------------- | ------- | ----------------- |
| `pgGold-50`  | 255, 250, 235 | #FFFAEB | Gold backgrounds  |
| `pgGold-100` | 255, 239, 204 | #FFEFCC | Light gold states |
| `pgGold-200` | 255, 236, 192 | #FFECC0 | Gold borders      |
| `pgGold-300` | 255, 224, 151 | #FFE097 | Gold accents      |
| `pgGold-400` | 255, 210, 104 | #FFD268 | Gold buttons      |
| `pgGold-500` | 249, 192, 53  | #F9C035 | Gold primary      |
| `pgGold-600` | 230, 168, 25  | #E6A819 | Gold hover        |
| `pgGold-700` | 201, 154, 44  | #C99A2C | Gold active       |
| `pgGold-800` | 167, 128, 37  | #A78025 | Gold strong       |
| `pgGold-900` | 134, 102, 29  | #86661D | Gold maximum      |
| `pgGold-950` | 98, 76, 24    | #624C18 | Gold deep         |

### Perigon Purple (pgPurple)

Feature and special states:

| Token          | RGB Values    | Hex     | Usage               |
| -------------- | ------------- | ------- | ------------------- |
| `pgPurple-50`  | 244, 243, 255 | #F4F3FF | Purple backgrounds  |
| `pgPurple-100` | 235, 234, 253 | #EBEAFD | Light purple states |
| `pgPurple-200` | 218, 215, 253 | #DAD7FD | Purple borders      |
| `pgPurple-300` | 190, 183, 251 | #BEB7FB | Purple accents      |
| `pgPurple-400` | 159, 142, 247 | #9F8EF7 | Purple buttons      |
| `pgPurple-500` | 127, 96, 242  | #7F60F2 | Purple primary      |
| `pgPurple-600` | 108, 63, 232  | #6C3FE8 | Purple hover        |
| `pgPurple-700` | 93, 45, 212   | #5D2DD4 | Purple active       |
| `pgPurple-800` | 78, 37, 178   | #4E25B2 | Purple strong       |
| `pgPurple-900` | 71, 35, 158   | #47239E | Purple maximum      |
| `pgPurple-950` | 39, 18, 99    | #271263 | Purple deep         |

### Perigon Pink (pgPink)

Highlighted and featured content:

| Token        | RGB Values    | Hex     | Usage             |
| ------------ | ------------- | ------- | ----------------- |
| `pgPink-50`  | 255, 235, 244 | #FFEBF4 | Pink backgrounds  |
| `pgPink-100` | 255, 213, 234 | #FFD5EA | Light pink states |
| `pgPink-200` | 255, 192, 223 | #FFC0DF | Pink borders      |
| `pgPink-300` | 255, 151, 203 | #FF97CB | Pink accents      |
| `pgPink-400` | 255, 104, 179 | #FF68B3 | Pink buttons      |
| `pgPink-500` | 251, 75, 163  | #FB4BA3 | Pink primary      |
| `pgPink-600` | 233, 53, 143  | #E9358F | Pink hover        |
| `pgPink-700` | 208, 37, 122  | #D0257A | Pink active       |
| `pgPink-800` | 173, 31, 102  | #AD1F66 | Pink strong       |
| `pgPink-900` | 139, 24, 82   | #8B1852 | Pink maximum      |
| `pgPink-950` | 104, 18, 61   | #68123D | Pink deep         |

### Perigon Teal (pgTeal)

Stable and balanced states:

| Token        | RGB Values    | Hex     | Usage             |
| ------------ | ------------- | ------- | ----------------- |
| `pgTeal-50`  | 228, 251, 248 | #E4FBF8 | Teal backgrounds  |
| `pgTeal-100` | 208, 251, 245 | #D0FBF5 | Light teal states |
| `pgTeal-200` | 194, 245, 238 | #C2F5EE | Teal borders      |
| `pgTeal-300` | 132, 235, 221 | #84EBDD | Teal accents      |
| `pgTeal-400` | 63, 222, 201  | #3FDEC9 | Teal buttons      |
| `pgTeal-500` | 34, 211, 187  | #22D3BB | Teal primary      |
| `pgTeal-600` | 29, 175, 156  | #1DAF9C | Teal hover        |
| `pgTeal-700` | 23, 140, 125  | #178C7D | Teal active       |
| `pgTeal-800` | 26, 117, 105  | #1A7569 | Teal strong       |
| `pgTeal-900` | 22, 100, 90   | #16645A | Teal maximum      |
| `pgTeal-950` | 11, 70, 62    | #0B463E | Teal deep         |

## Alpha Colors

Special alpha color tokens for overlays and transparency:

| Token           | RGB Values    | Usage               |
| --------------- | ------------- | ------------------- |
| `alphaWhite`    | 255, 255, 255 | White with alpha    |
| `alphaNeutral`  | 157, 157, 157 | Neutral with alpha  |
| `alphaBlack`    | 18, 18, 18    | Black with alpha    |
| `alphaGold`     | 249, 192, 53  | Gold with alpha     |
| `alphaSapphire` | 64, 178, 208  | Sapphire with alpha |
| `alphaGreen`    | 31, 193, 107  | Green with alpha    |
| `alphaRed`      | 251, 55, 72   | Red with alpha      |
| `alphaPurple`   | 120, 77, 239  | Purple with alpha   |
| `alphaBlue`     | 71, 108, 255  | Blue with alpha     |
| `alphaPink`     | 251, 75, 163  | Pink with alpha     |
| `alphaOrange`   | 255, 145, 71  | Orange with alpha   |
| `alphaTeal`     | 34, 211, 187  | Teal with alpha     |

```css
/* Usage with transparency */
.overlay {
  background-color: rgba(var(--color-pg-alpha-black), 0.5);
}
.tint {
  background-color: rgba(var(--color-pg-alpha-blue), 0.1);
}
```

## Semantic Color System

### Background Colors

Mapped background colors that adapt to theme:

| Token              | Light Mode    | Dark Mode     | Usage                 |
| ------------------ | ------------- | ------------- | --------------------- |
| `pgBackground-0`   | pgNeutral-0   | pgNeutral-900 | Primary backgrounds   |
| `pgBackground-50`  | pgNeutral-50  | pgNeutral-900 | Secondary backgrounds |
| `pgBackground-100` | pgNeutral-100 | pgNeutral-800 | Tertiary backgrounds  |
| `pgBackground-200` | pgNeutral-200 | pgNeutral-700 | Subtle backgrounds    |
| `pgBackground-300` | pgNeutral-300 | pgNeutral-600 | Card backgrounds      |
| `pgBackground-800` | pgNeutral-800 | pgNeutral-200 | Inverted backgrounds  |
| `pgBackground-950` | pgNeutral-950 | pgNeutral-0   | Maximum contrast bg   |

### Text Colors

Semantic text colors with theme adaptation:

| Token        | Light Mode    | Dark Mode      | Usage                 |
| ------------ | ------------- | -------------- | --------------------- |
| `pgText-0`   | pgNeutral-0   | pgNeutral-950  | Inverted text         |
| `pgText-300` | pgNeutral-400 | pgNeutral-400  | Placeholder text      |
| `pgText-400` | pgNeutral-600 | pgNeutral-300  | Secondary text        |
| `pgText-600` | pgNeutral-500 | pgNeutral-300  | Tertiary text         |
| `pgText-700` | pgNeutral-600 | pgText-inv-700 | Strong text           |
| `pgText-800` | pgNeutral-950 | pgNeutral-100  | Primary text          |
| `pgText-950` | pgNeutral-950 | pgNeutral-0    | Maximum contrast text |

### Border Colors (pgStroke)

Consistent border system:

| Token          | RGB Values    | Usage                    |
| -------------- | ------------- | ------------------------ |
| `pgStroke-0`   | pgNeutral-0   | White borders            |
| `pgStroke-100` | pgNeutral-100 | Subtle borders           |
| `pgStroke-200` | pgNeutral-200 | Default borders          |
| `pgStroke-250` | 223, 223, 223 | Medium borders           |
| `pgStroke-300` | pgNeutral-300 | Strong borders           |
| `pgStroke-950` | pgNeutral-950 | Maximum contrast borders |

### Icon Colors (pgIcon)

Consistent icon coloring:

| Token        | RGB Values    | Usage                  |
| ------------ | ------------- | ---------------------- |
| `pgIcon-0`   | pgNeutral-0   | White icons            |
| `pgIcon-200` | pgNeutral-200 | Subtle icons           |
| `pgIcon-300` | pgNeutral-300 | Secondary icons        |
| `pgIcon-400` | pgNeutral-400 | Default icons          |
| `pgIcon-600` | pgNeutral-600 | Primary icons          |
| `pgIcon-950` | pgNeutral-950 | Maximum contrast icons |

## State Colors (pgState)

Comprehensive state color system with variants:

### State Color Structure

Each state has four variants: `dark`, `base`, `light`, `lighter`

```css
/* Example: Information State */
--color-pg-state-information-dark: rgba(var(--color-pg-sapphire-950), 1);
--color-pg-state-information-base: rgba(var(--color-pg-sapphire-500), 1);
--color-pg-state-information-light: rgba(var(--color-pg-sapphire-200), 1);
--color-pg-state-information-lighter: rgba(var(--color-pg-sapphire-50), 1);
```

### Available State Colors

| State                | Base Color | Usage                 |
| -------------------- | ---------- | --------------------- |
| `pgStateFaded`       | pgNeutral  | Disabled, inactive    |
| `pgStateInformation` | pgSapphire | Info messages, help   |
| `pgStateWarning`     | pgOrange   | Warnings, caution     |
| `pgStateError`       | pgRed      | Errors, destructive   |
| `pgStateSuccess`     | pgGreen    | Success, positive     |
| `pgStateAway`        | pgGold     | Away, pending         |
| `pgStateFeature`     | pgPurple   | Features, highlights  |
| `pgStateVerified`    | pgSapphire | Verified, trusted     |
| `pgStateHighlighted` | pgPink     | Highlighted, featured |
| `pgStateStable`      | pgTeal     | Stable, balanced      |

```css
/* Usage Examples */
.info-banner {
  background-color: var(--color-pg-state-information-lighter);
  border: 1px solid var(--color-pg-state-information-light);
  color: var(--color-pg-state-information-dark);
}

.success-button {
  background-color: var(--color-pg-state-success-base);
  color: white;
}

.error-text {
  color: var(--color-pg-state-error-base);
}
```

## Special Background Colors

### Tinted Backgrounds

Special background colors for specific use cases:

| Token                       | Value                    | Usage               |
| --------------------------- | ------------------------ | ------------------- |
| `pgBackgroundBlueTint`      | Theme-specific blue tint | Info backgrounds    |
| `pgBackgroundBlueTintDark`  | pgSapphire-600           | Dark blue tints     |
| `pgBackgroundBlueTintLight` | Theme-specific light     | Light blue tints    |
| `pgBackgroundPurpleTint`    | Theme-specific purple    | Feature backgrounds |
| `pgBackgroundGreenTint`     | Theme-specific green     | Success backgrounds |

### Alpha Backgrounds

Pre-defined alpha backgrounds:

| Token                          | Value                  | Usage                     |
| ------------------------------ | ---------------------- | ------------------------- |
| `pgBackgroundBluePillAlpha-10` | Predefined alpha blue  | Pill backgrounds          |
| `pgBackgroundBluePillAlpha-15` | Predefined alpha blue  | Stronger pill backgrounds |
| `pgBackgroundBlueTintAlpha-15` | Predefined alpha tint  | Subtle blue tints         |
| `pgBackgroundBlueTintAlpha-25` | Predefined alpha tint  | Medium blue tints         |
| `pgBackgroundAlphaTranslucent` | Theme-specific overlay | Modal backdrops           |

## Dark Mode Adaptations

### Automatic Theme Switching

Colors automatically adapt in dark mode:

```css
:root {
  /* Light mode */
  --color-bg-0: var(--color-pg-neutral-0);
  --color-text-800: var(--color-pg-neutral-950);
}

.dark {
  /* Dark mode overrides */
  --color-bg-0: var(--color-pg-neutral-900);
  --color-text-800: var(--color-pg-neutral-100);
}
```

### State Color Adaptations

State colors adapt their opacity and base colors in dark mode:

```css
/* Light mode state colors */
:root {
  --color-pg-state-success-light: rgba(var(--color-pg-green-200), 1);
}

/* Dark mode state colors */
.dark {
  --color-pg-state-success-light: rgba(var(--color-pg-alpha-green), 0.16);
}
```

## Usage Examples

### Component Color Implementation

```css
/* Card component */
.card {
  background-color: rgb(var(--color-bg-0));
  border: 1px solid rgb(var(--color-stroke-200));
  color: rgb(var(--color-text-800));
}

/* Button variants */
.btn-primary {
  background-color: rgb(var(--color-pg-blue-500));
  color: rgb(var(--color-pg-neutral-0));
  border: 1px solid rgb(var(--color-pg-blue-500));
}

.btn-success {
  background-color: var(--color-pg-state-success-base);
  color: white;
}

/* Status indicators */
.status-info {
  background-color: var(--color-pg-state-information-lighter);
  color: var(--color-pg-state-information-dark);
  border-left: 4px solid var(--color-pg-state-information-base);
}

.status-warning {
  background-color: var(--color-pg-state-warning-lighter);
  color: var(--color-pg-state-warning-dark);
  border-left: 4px solid var(--color-pg-state-warning-base);
}
```

### Tailwind Class Usage

```html
<!-- Using Perigon color classes -->
<div class="border-pgStroke-200 bg-pgNeutral-100 text-pgNeutral-950">
  <h2 class="text-pgBlue-600">Primary Heading</h2>
  <p class="text-pgNeutral-600">Secondary text content</p>

  <button class="bg-pgBlue-500 text-pgNeutral-0 hover:bg-pgBlue-600">
    Primary Action
  </button>

  <div
    class="border-pgStateSuccess-light bg-pgStateSuccess-lighter text-pgStateSuccess-dark"
  >
    Success message
  </div>
</div>
```

This comprehensive color system provides complete coverage of the Perigon design system, ensuring consistency across all components and states while supporting both light and dark themes.
