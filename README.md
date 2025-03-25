# Weather Widget

A lightweight, embeddable weather widget built with React.

## Features
- Dynamic location detection from NT property Google Maps links
- Weather forecasts for each property
- Fallback to The Pineapple 🍍 if location not found
- Secure headers and content delivery
- Proper React/ReactDOM loading management

## Implementation Journey

### Current Implementation
The widget uses direct script embedding with managed dependencies:
```html
<script src="https://weather-widget-pied.vercel.app/embed/widget.js"></script>
```

### Location Handling
The widget extracts coordinates from National Trust property pages:
```javascript
// From property's "Get Directions" link
destination=54.68729%2C-6.657566
```

Fallback Location:
- The Pineapple, Dunmore (56.0729, -3.8326)
- A folly built in 1761 near Airth, Scotland

### Development History

#### 1. Vanilla JavaScript Approach
First attempt using pure DOM manipulation:
```javascript
document.createElement('div')
// Direct DOM manipulation was fun but limiting
```
**Lessons**: While straightforward, lacked component reusability and state management and George said I'd be working with React!

#### 2. Global Script Injection
Attempted dynamic React component loading:
```javascript
window.WeatherWidgetAppComponent = App;
```
**Challenges**: Script context isolation and component serialization issues

#### 3. IFrame Implementation
Explored for better isolation:
```html
<iframe src="weather-widget.html"></iframe>
```
**Outcome**: Added complexity without significant benefits and just INCREDIBLY ugly.

## Technical Details
- Types from [openweathermap-ts](https://www.npmjs.com/package/openweathermap-ts)
- React 18.3.1
- Security:
  - `X-Content-Type-Options: nosniff`
  - `Cache-Control: no-cache`
  - Content-Type enforcement

## Usage
Add to any HTML page:
```html
<script src="https://weather-widget-pied.vercel.app/embed/widget.js"></script>

# Weather Widget

// ...existing code...

## Development

### Setup
1. Clone the repository:
```bash
git clone https://github.com/yourusername/weatherWidget.git
cd weatherWidget
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

### Testing Locally
1. Build the project
2. Check the widget in `dist/embed/example.html`
3. Verify script loading in browser dev tools

