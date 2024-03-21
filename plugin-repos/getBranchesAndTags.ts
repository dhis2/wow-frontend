import { octokit } from "./load-repos";

export const getBranchesAndTags = async (
  repository: { name: string },
  owner: string
) => {
  const repo = repository.name;
  let branches = await octokit.paginate(octokit.rest.repos.listBranches, {
    repo,
    owner,
    per_page: 60,
    page: 1,
    sort: "pushed",
    protected: true,
  });

  const { data: tags } = await octokit.rest.repos.listTags({
    repo,
    owner,
    per_page: 10,
    page: 1,
    sort: "pushed",
  });

  const result = { branches, tags };

  if (repository.topics.includes("web-app")) {
    const {
      data: { content },
    } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      path: "package.json",
      owner,
      repo,
    });

    const file = JSON.parse(Buffer.from(content, "base64").toString());

    result.package = file;
  }

  return result;
};
