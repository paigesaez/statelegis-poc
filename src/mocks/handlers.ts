import { rest } from 'msw';

export const handlers = [
  // Mock getSessionList
  rest.get('https://api.legiscan.com/*', (req, res, ctx) => {
    if (req.url.searchParams.get('op') === 'getSessionList') {
      return res(
        ctx.status(200),
        ctx.json([
          { session_id: 1, name: '2023-2024 Regular Session' },
          { session_id: 2, name: '2021-2022 Regular Session' },
        ])
      );
    }
    // Mock getMasterList
    if (req.url.searchParams.get('op') === 'getMasterList') {
      return res(
        ctx.status(200),
        ctx.json([
          { bill_id: 101, bill_number: 'AB1', title: 'Mock Bill 1', status: 'Passed' },
          { bill_id: 102, bill_number: 'AB2', title: 'Mock Bill 2', status: 'Introduced' },
        ])
      );
    }
    // Mock getBill
    if (req.url.searchParams.get('op') === 'getBill') {
      return res(
        ctx.status(200),
        ctx.json({
          bill_id: 101,
          bill_number: 'AB1',
          title: 'Mock Bill 1',
          status: 'Passed',
          sponsors: [{ name: 'Jane Doe' }],
          last_action: 'Signed by Governor',
          summary: 'A mock summary.',
          texts: [{ text: 'Full mock bill text.' }],
        })
      );
    }
    // Mock getSearch
    if (req.url.searchParams.get('op') === 'getSearch') {
      return res(
        ctx.status(200),
        ctx.json([
          { bill_id: 201, bill_number: 'SB1', title: 'Search Result Bill', status: 'Passed' },
        ])
      );
    }
    return res(ctx.status(404));
  }),
]; 