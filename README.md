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
   ```

2. **Add your LegiScan API key:**
   - Create a `.env` file in the project root:
     ```
     VITE_LEGISCAN_API_KEY=your_legiscan_api_key_here
     ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

## Usage

- Use the dropdowns to select a state and session.
- Enter a keyword to search for bills (uses LegiScan's `getSearch` API).
- Browse paginated results and click any bill to view more details in a modal.
- The app caches bill lists for 10 minutes to reduce API calls and improve performance.

## LegiScan API Usage

This app uses the [`@civicnews/legiscan-client`](https://www.npmjs.com/package/@civicnews/legiscan-client) package to interact with the LegiScan API.  
Refer to the [LegiScan API User Manual](https://legiscan.com/misc/LegiScan_API_User_Manual.pdf) for full details.

### Key API Operations

- **getSessionList:**  
  Retrieve all legislative sessions for a given state.  
  _Example usage:_  
  ```js
  const sessions = await client.getSessionList('CA');
  ```

- **getMasterList:**  
  Get all bills for a session or state.  
  _Example usage:_  
  ```js
  const bills = await client.getMasterList({ state: 'CA' });
  ```

- **getBill:**  
  Fetch detailed information about a specific bill by its ID.  
  _Example usage:_  
  ```js
  const billDetails = await client.getBill(billId);
  ```

- **getSearch:**  
  Perform keyword searches across all legislation.  
  _Example usage:_  
  ```js
  const results = await client.getSearch('climate change', { state: 'CA' });
  ```

## Notes

- This POC fetches data directly from the LegiScan API. If you encounter CORS issues, you may need to use a backend proxy.
- For more advanced features, refer to the LegiScan API documentation.

---

## Explanation of the API Operations

- **getSessionList:**  
  Returns a list of legislative sessions (e.g., years or terms) for a state. Useful for letting users pick which session's bills to view.

- **getMasterList:**  
  Returns all bills for a given session or state. This is how you get the main list of bills to display.

- **getBill:**  
  Returns detailed info about a single bill, such as its full text, sponsors, and history.

- **getSearch:**  
  Lets you search for bills by keyword, across all available legislation. 
