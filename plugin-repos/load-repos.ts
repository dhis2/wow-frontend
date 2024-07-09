import { RepoType } from "@site/src/types/repos";
import { Octokit, App } from "octokit";
import { getBranchesAndTags } from "./getBranchesAndTags";
import { findOwner } from "./owners";

const isDevelopment = process.env.NODE_ENV === 'development';

const user = process.env.REPOS_SCRAPER_TOKEN;

export const octokit = new Octokit({
  auth: user,
});

if(!user) {
  throw "no token set for OctoKit"
} else {
  console.info("token provided for OctoKit")
}

const reposCountLimit = process.env.LIMIT_REPOS_COUNT
  ? Number(process.env.LIMIT_REPOS_COUNT)
  : undefined;

type ReposPluginOptions = {
  githubToken: string;
  org: string;
};

export const loadRepos = async (
  options: ReposPluginOptions
): Promise<RepoType[]> => {
  const org = options.org ?? "dhis2";

  const iterator = await octokit.paginate.iterator(
    octokit.rest.repos.listForOrg,
    {
      org,
      per_page: reposCountLimit ? 5 : 50,
      page: 1,
      sort: "pushed",
    }
  );

  // const { data: repos } = await octokit.rest.repos.listForOrg({
  //   org,
  //   sort: "pushed",
  // });

  const result: RepoType[] = [];

  let i = 1;
  for await (const { data: repos } of iterator) {
    for (const repo of repos) {
      const extraInfo = await getBranchesAndTags(repo, org);

      const { data: contributors } = await octokit.request(
        "GET /repos/{owner}/{repo}/contributors",
        {
          owner: org,
          repo: repo.name,
        }
      );

      const deprecated =
        repo.archived ||
        !!repo.description?.match(new RegExp("deprecated", "i"));

      const resultWithExtras: RepoType = {
        ...repo,
        ...extraInfo,
        contributors,
        deprecated,
        teamOwner: findOwner(repo, deprecated),
      };

      result.push(resultWithExtras);

      console.info(`[${i++}] ${repo.name}`);
    }

    if (reposCountLimit && i > reposCountLimit) break;
  }

  return result;

  // return repos.map((r) => {
  //   return {
  //     id: r.id,
  //     name: r.name,
  //     description: r.description,
  //     svn_url: r.svn_url,
  //     pushed_at: r.pushed_at,
  //     topics: r.topics,
  //     stargazers_count: r.stargazers_count,
  //     deprecated: !!r.description?.match(new RegExp("deprecated", "i")),
  //     ...r,
  //   };
  // });

  // const result =await octokit.request(`GET /orgs/${org}/repos`)
  //   console.log(repos.map(r => r.name))
  // return repos;
};
