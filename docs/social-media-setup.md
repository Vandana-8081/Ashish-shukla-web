# Social feed setup

The homepage reads Facebook Page posts and Instagram video/Reel media through two server-side Route Handlers. Provider access tokens are used only by server code and are never included in the browser response. Successful responses are cached for 15 minutes, with stale responses allowed for up to 30 minutes.

## Meta account requirements

1. Create or use a Meta developer app and add the Facebook Login/Graph API and Instagram Graph API products needed for the accounts.
2. Facebook feed access requires a Facebook Page, its Page ID, and a valid Page access token with permission to read that Page's published content. Personal profiles cannot be queried through the Page feed endpoint.
3. Instagram Graph API media access requires an eligible Instagram professional account (Business or Creator) connected to a Facebook Page, the Instagram account ID, and an access token with the account's approved Instagram media permissions.
4. Configure the app for the account owners and obtain any required app review/advanced access before production use. Permissions and access levels depend on the Meta app and account setup; verify them in Meta's developer dashboard.

## Environment

Copy the blank social feed entries from `.env.example` into the local `.env.local` file and fill in:

```env
FACEBOOK_PAGE_ID=
FACEBOOK_PAGE_ACCESS_TOKEN=
INSTAGRAM_ACCOUNT_ID=
INSTAGRAM_ACCESS_TOKEN=
META_GRAPH_API_VERSION=
```

Use a currently supported Graph API version for `META_GRAPH_API_VERSION` (format `vNN.0`). Never commit `.env.local`, put tokens in `NEXT_PUBLIC_*` variables, or send tokens to the browser.

## Routes and verification

- `GET /api/social/facebook` returns the newest available Page posts.
- `GET /api/social/instagram` returns the newest available video/Reel media. Still images are filtered out.
- Both routes return a compact `unconfigured` response when required environment values are missing and a generic `error` response for provider/API failures. Raw Graph API errors and credentials are not returned.
- Start the site with `npm run dev`, then request both routes in a browser or with `curl`. Confirm each response contains only the official account's IDs, permalinks, captions, timestamps, and available thumbnails.
- The client retries both feeds every 15 minutes. An error on one provider does not hide the other provider's results.

For authentication errors, confirm IDs, token type, token expiry, and granted permissions in Meta's developer tools. Permission errors usually require correcting app review/access or reconnecting the account. For rate limits, verify usage in Meta's dashboard; the server cache avoids a provider request on every page view.
