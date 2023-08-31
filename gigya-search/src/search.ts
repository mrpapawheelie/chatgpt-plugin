import { ApiException, OpenAPIRoute, Query, ValidationError } from "@cloudflare/itty-router-openapi";

export class GetSearch extends OpenAPIRoute {
  static schema = {
    tags: ['Search'],
    summary: 'Search Gigya Auth docs by a query parameter',
    parameters: {
      q: Query(String, {
        description: 'The query to search for',
        default: 'jwt token'
      }),
      apiKey: Query(String, {
        description: 'The Google API key to use for the search',
        default: '1234567890'
      }),
      cx: Query(String, {
        description: 'The Google CX to use for the search',
        default: '1234567890'
      }),
      items: Query(String, {
        description: 'Comma separated list of fields to return',
        default: 'title,snippet,link'
      })
    },
    responses: {
      '200': {
        schema: {
          repos: [
            {
              name: 'itty-router-openapi',
              description: 'OpenAPI 3 schema generator and validator for Cloudflare Workers',
              stars: '80',
              url: 'https://github.com/cloudflare/itty-router-openapi',
            }
          ]
        },
      },
    },
  }

  async handle(request: Request, env, ctx, data: Record<string, any>) {
    const url = `https://customsearch.googleapis.com/customsearch/v1?cx=${data.cx}}&key=${data.apiKey}&q=${data.q}&fields=items(${data.items})`

    const resp = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GigyaAuthAI - Cloudflare Workers ChatGPT Plugin to Search Gigya Auth Docs'
      }
    })

    if (!resp.ok) {
      return new Response(await resp.text(), { status: 400 })
    }

    const json = await resp.json()

    // @ts-ignore
    const results = json.items.map((item: any) => ({
      name: item.title,
      description: item.snippet,
      url: item.link
    }))

    return {
      results: results
    }
  }
}
