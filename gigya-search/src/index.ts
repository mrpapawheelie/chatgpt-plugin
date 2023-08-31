import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { GetSearch } from "./search";

export const router = OpenAPIRouter({
  schema: {
    info: {
      title: 'Gigya Auth Docs Search API',
      description: 'A plugin that allows the user to search for Gigya Auth Docs using ChatGPT',
      version: 'v0.0.1',
    },
  },
  docs_url: '/',
  aiPlugin: {
    name_for_human: 'Gigya Auth Docs Search',
    name_for_model: 'gigya_auth_docs_search',
    description_for_human: "Gigya Auth Docs Search plugin for ChatGPT.",
    description_for_model: "Gigya Auth Docs Search plugin for ChatGPT. You can search for Gigya Auth Docs using this plugin.",
    contact_email: 'support@example.com',
    legal_info_url: 'http://www.example.com/legal',
    logo_url: 'https://workers.cloudflare.com/resources/logo/logo.svg',
  },
})

router.get('/search', GetSearch)

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))

export default {
  fetch: router.handle
}
