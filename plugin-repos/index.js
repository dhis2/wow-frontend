import { loadRepos } from "./load-repos";

export default async function myPlugin(context, options) {
  // ...
  return {
    name: "github-repos",
    async loadContent() {
      return loadRepos(options);
    },
    async contentLoaded({ content, actions }) {
      const { createData, addRoute } = actions;

      const reposJsonPath = await createData(
        "repos.json",
        JSON.stringify(content)
      );

      addRoute({
        path: "/repos",
        component: "@site/src/components/Repos/index.tsx",
        modules: {
          // propName -> JSON file path
          repos: reposJsonPath,
        },
        exact: true,
      });
      /* ... */
    },
    /* other lifecycle API */
  };
}
