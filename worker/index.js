// Grandeza site Worker.
//
// Static assets (the "Survive the Audit" game and its media) are served
// directly by Cloudflare's asset layer from ./grandeza-growth-engine — see
// wrangler.jsonc. This Worker only handles requests that don't map to an
// asset: it points the site entry points (/, /scan, /scan/game) at the game,
// which lives at /game/ and loads its art from /assets/characters/.

const GAME_PATH = "/game/";
const ENTRY_PATHS = new Set(["/", "/scan", "/scan/", "/scan/game", "/scan/game/"]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (ENTRY_PATHS.has(url.pathname)) {
      return Response.redirect(new URL(GAME_PATH, url).toString(), 302);
    }

    return env.ASSETS.fetch(request);
  },
};
