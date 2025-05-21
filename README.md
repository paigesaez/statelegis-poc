# StateLegis POC

A proof-of-concept React + Vite web app that fetches and displays legislative bill data from the LegiScan API, styled with Tailwind CSS.

## Features

- Search and display legislative bills by keyword, state, and session
- Filter bills by title or keyword
- View bill number, title, and status
- Pagination for large bill lists
- Caching to reduce API calls and improve performance
- Click any bill to view detailed information (status, sponsors, last action, summary, full text)

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   npm install msw --save-dev
   ```

2. **Configure Environment Variables:**
   - Create a `.env` file in the project root with the following variables:
     ```
     # LegiScan API Configuration
     VITE_LEGISCAN_API_KEY=your_legiscan_api_key_here
     VITE_LEGISCAN_API_BASE_URL=https://api.legiscan.com
     
     # Cache Configuration
     # Duration in minutes for cached data to remain valid
     VITE_CACHE_DURATION_MINUTES=10
     # Maximum number of items to keep in cache
     VITE_CACHE_MAX_ITEMS=100
     
     # Rate Limiting
     # Maximum number of API requests per window
     VITE_API_REQUEST_LIMIT=100
     # Duration of rate limiting window in minutes
     VITE_API_REQUEST_WINDOW_MINUTES=60
     
     # Optional: Override default API timeout (in milliseconds)
     VITE_API_TIMEOUT=10000
     ```

   - **Cache Strategy:**
     - API responses are cached for `VITE_CACHE_DURATION_MINUTES` minutes
     - Cache size is limited to `VITE_CACHE_MAX_ITEMS` entries
     - Cache is automatically invalidated when responses change
     - Cache keys are based on the API operation and parameters

   - **Rate Limiting:**
     - API requests are rate-limited to `VITE_API_REQUEST_LIMIT` requests per `VITE_API_REQUEST_WINDOW_MINUTES` minutes
     - This helps prevent hitting LegiScan's API rate limits
     - Requests will be automatically delayed if the limit is reached

   - **Important:** Never commit your `.env` file to version control. Keep it secure and only share it with authorized team members.

3. **Start the development server:**
   ```sh
   npm run dev
   ```
   Open [http://localhost:3000/](http://localhost:3000/) in your browser.

## Usage

- Use the dropdowns to select a state and session.
- Enter a keyword to search for bills (uses LegiScan's `getSearch` API).
- Browse paginated results and click any bill to view more details in a modal.
- The app caches bill lists for 10 minutes to reduce API calls and improve performance.

## Mocking API Calls in Development

This project uses [Mock Service Worker (MSW)](https://mswjs.io/) to intercept and mock LegiScan API calls during development. This allows you to work on the UI without making real API requests.

- **Development mode (`npm run dev`)**: MSW is enabled by default. All API calls are mocked with sample data from `src/mocks/handlers.ts`.
- **Production mode (`npm run build` + `npm run preview` or deploy):** MSW is disabled. The app makes real API calls to LegiScan.

### How to Use

- To use mock data, simply run:
  ```sh
  npm run dev
  ```
- To use the real API (for production or testing real data):
  ```sh
  npm run build
  npm run preview
  ```
  Or deploy your app as usual.

### Summary Table

| Command             | Mode         | Uses Mock Data? | Uses Real API? |
|---------------------|--------------|-----------------|---------------|
| `npm run dev`       | Development  | Yes             | No            |
| `npm run build`     | Production   | No              | Yes           |
| `npm run preview`   | Production   | No              | Yes           |
| Deploy to prod      | Production   | No              | Yes           |

You can customize mock responses in `src/mocks/handlers.ts` as needed for your UI development.

## LegiScan API Usage

This app uses the [`

> **Note:** After connecting your repository to Vercel and v0, make sure to push a commit to GitHub to trigger the first deployment. Vercel deploys automatically on every push to the connected branch.