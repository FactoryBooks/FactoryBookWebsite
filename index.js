export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/download") {
      const downloadUrl =
        ""

      return Response.redirect(downloadUrl, 302);
    }

    if (url.pathname === "/version") {
      const response = await fetch(
        "",
        {
          headers: {
            "Accept": "application/vnd.github+json",
            "User-Agent": "FactoryBook-Download",
          },
        }
      );

      const body = await response.text();

      if (!response.ok) {
        return new Response(
          `GitHub API error ${response.status}: ${body}`,
          {
            status: 502,
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );
      }

      const release = JSON.parse(body);

      return new Response(
        JSON.stringify({
          version: release.tag_name,
          name: release.name,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    return new Response("FactoryBook Download Service", {
      status: 200,
    });
  },
};
