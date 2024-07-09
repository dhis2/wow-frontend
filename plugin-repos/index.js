import { loadRepos } from "./load-repos";

export default async function myPlugin(context, options) {
  // ...
  return {
    name: "github-repos",
    async loadContent() {
      if (process.env.SKIP_GH_REPOS) {
        return [];
      }
      return loadRepos(options);
    },
    async contentLoaded({ content, actions }) {
      const { createData, addRoute, setGlobalData } = actions;

      setGlobalData(content);
    },
    /* other lifecycle API */
  };
}
