# Hoarder

> Everything you own. Finally organized.

A modern, lightweight personal inventory management web application built with React, TypeScript, and Tailwind CSS. Keep track of all your equipment, electronics, and possessions in one place—no backend required.

![Hoarder Banner](https://via.placeholder.com/1200x300/3B82F6/FFFFFF?text=Hoarder)

## ✨ Features

- **Complete Item Management** - Add, edit, view, and delete items with ease
- **Rich Item Details** - Track name, description, price, currency, purchase date, and images
- **Category Organization** - Create and manage categories; assign multiple categories per item
- **Smart Search** - Real-time search across item names, descriptions, and categories
- **Advanced Filtering** - Filter by categories and price range
- **Flexible Sorting** - Sort by newest, oldest, name (A-Z/Z-A), and price (low-high/high-low)
- **Statistics Dashboard** - View total items, total value, average value, and category count
- **Google Price Search** - One-click price research for any item
- **LocalStorage Persistence** - All data stored locally in your browser
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile
- **No Backend Required** - 100% client-side application
- **GitHub Pages Ready** - Easily deploy for free

## 🚀 Tech Stack

- **[React](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **LocalStorage** - Data persistence

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/hoarder.git
   cd hoarder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## 🏗️ Build

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

Preview the production build locally:

```bash
npm run preview
```

## 🌐 GitHub Pages Deployment

This application is configured to deploy automatically to GitHub Pages.

### Setup Instructions

1. **Enable GitHub Pages** in your repository:
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Automatic Deployment**:
   - The GitHub Actions workflow will automatically build and deploy
   - Your site will be available at: `https://YOUR_USERNAME.github.io/hoarder/`

4. **Custom Base Path** (if needed):
   - The `vite.config.ts` is already configured with `base: '/hoarder/'`
   - If you rename the repository, update the `base` field in `vite.config.ts`

### Manual Deployment

You can also manually trigger deployment:

1. Go to Actions tab in your repository
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow"

## 📁 Project Structure

```
hoarder/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── src/
│   ├── components/
│   │   ├── categories/
│   │   │   └── CategoryManager.tsx
│   │   ├── filters/
│   │   │   └── Filters.tsx
│   │   ├── items/
│   │   │   ├── ItemCard.tsx
│   │   │   ├── ItemDetails.tsx
│   │   │   └── ItemForm.tsx
│   │   ├── layout/
│   │   │   ├── EmptyState.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Statistics.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Modal.tsx
│   ├── context/
│   │   └── InventoryContext.tsx    # Global state management
│   ├── data/
│   │   └── seedData.ts             # Initial demo data
│   ├── pages/
│   │   └── Dashboard.tsx           # Main page
│   ├── services/
│   │   ├── googleSearch.ts         # Google price search
│   │   └── storage.ts              # LocalStorage abstraction
│   ├── types/
│   │   └── inventory.ts            # TypeScript definitions
│   ├── utils/
│   │   ├── filters.ts              # Filtering and sorting logic
│   │   └── formatters.ts           # Formatting utilities
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                   # Tailwind directives
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 💾 LocalStorage Architecture

All application data is stored in the browser's localStorage:

- **`hoarder.items`** - Array of items
- **`hoarder.categories`** - Array of categories  
- **`hoarder.initialized`** - Initialization flag

### Data Models

**Item**
```typescript
{
  id: string;
  name: string;
  description?: string;
  price?: number;
  currency: string; // USD, EUR, GBP, ILS
  categoryIds: string[];
  imageUrl?: string;
  purchaseDate?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Category**
```typescript
{
  id: string;
  name: string;
}
```

### Data Persistence

- Data is automatically saved when you add, edit, or delete items/categories
- Data persists across browser sessions
- Graceful error handling for corrupted data
- First-time users see demo data automatically

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Change to your preferred color
      },
    },
  },
};
```

### Adding Currencies

Add new currencies in `src/types/inventory.ts`:

```typescript
export const CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP', 'ILS', 'JPY'];

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  ILS: '₪',
  JPY: '¥',
};
```

## 🔒 Privacy

- **100% Local** - All data is stored in your browser's localStorage
- **No Backend** - No data is sent to any server
- **No Analytics** - No tracking or telemetry
- **No Authentication** - No accounts or passwords

Your data stays on your device.

## 🐛 Troubleshooting

### Data Not Persisting

Check if localStorage is enabled in your browser:
```javascript
console.log(localStorage.getItem('hoarder.items'));
```

### Build Errors

1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Clear build cache:
   ```bash
   rm -rf dist
   npm run build
   ```

### GitHub Pages 404

Ensure the `base` path in `vite.config.ts` matches your repository name:
```typescript
export default defineConfig({
  base: '/YOUR_REPO_NAME/',
});
```

## 📝 License

MIT License - feel free to use this project for any purpose.

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## 🌟 Acknowledgments

Built with modern web technologies and a touch of hoarding enthusiasm.

---

**Hoarder** - Because organizing your stuff shouldn't require a database.
