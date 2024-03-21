import { RepoOwnerType, RepoType } from "@site/src/types/repos";
import RepoDependencies from "./Dependencies";
import RepoBranches from "./RepoBranches";
import styles from "./index.module.css";
import { useState } from "react";
import ListOptions, { ListOptionsType } from "./ListOptions";
import GeneralInfo from "./GeneralInfo";
import clsx from "clsx";

export type ReposProps = {
  repos: RepoType[];
};

const getType = (topics: string[]) => {
  if (topics.includes("web-app")) return "web-app";
  if (topics.includes("web-lib")) return "web-lib";
};

const ReposList = (props: ReposProps) => {
  const { repos: allRepos } = props;

  const [options, setOptions] = useState<ListOptionsType>({
    "show-webapps-only": false,
    "show-dependencies": false,
    "show-contributors": false,
    "current-team": "all",
  });

  const allOwners = allRepos.reduce((prev, curr) => {
    const { teamOwner } = curr;

    const result = {
      ...prev,
    };
    if (teamOwner) {
      result[teamOwner] =
        result[teamOwner] === undefined ? 1 : result[teamOwner] + 1;
    }
    result["all"] = !result["all"] ? 1 : result["all"] + 1;
    return result;
  }, {}) as Record<RepoOwnerType, number>;

  const repos: RepoType[] = allRepos
    .map((r) => {
      const isContinuouslyDelivered = !!r.tags?.[0]?.name?.match(/v10\d{1}\./i);
      const isWebApp = !!r.topics?.includes("web-app") || r.name.endsWith('-app')

      return {
        ...r,
        contributors: r.contributors
          ?.filter((r) => !r.login.match("bot"))
          .slice(0, 10),
        branches: r.branches
          ?.filter((b) => !b.name?.match(/transifex|patch/i))
          .reverse(),
        isContinuouslyDelivered,
        isWebApp,
        type: getType(r.topics),
        lastTag: r.tags?.[0]?.name,
      } satisfies RepoType;
    })
    .filter((r) => {
      return (
        options["current-team"] === "all" ||
        r.teamOwner === options["current-team"]
      ) && (
        !options["show-webapps-only"] || r.isWebApp
      );
    });

  return (
    <>
      <ListOptions
        owners={allOwners}
        options={options}
        setOptions={setOptions}
      />

      <GeneralInfo repos={repos} />

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Last updated</th>
            <th>Owner</th>
            <th>Language</th>
            <th>Branches (protected)</th>
            {options["show-dependencies"] && <th>Internal dependencies</th>}
            {options["show-contributors"] && <th>Contributors</th>}
          </tr>
        </thead>
        <tbody>
          {repos.map((r, index) => {
            return (
              <tr
                key={r.id}
                // onClick={() => console.log(r)}
                className={clsx({
                  [styles.hidden]: options["show-webapps-only"] && !r.isWebApp,
                  [styles.deprecated]: r.deprecated
                })}
              >
                <td>{index + 1}</td>
                <td>
                  <a href={r.html_url} target="_blank">
                    {r.name}
                  </a>
                  <br />
                  <small>
                    {r.description}{" "}
                    {r.stargazers_count > 1 && (
                      <>
                        {" "}
                        | <>{r.stargazers_count}★</>
                      </>
                    )}
                  </small>
                  <div>
                    {r.type && (
                      <>
                        <span className="badge badge--primary margin-left--xs">
                          {r.type}
                        </span>
                      </>
                    )}
                    {r.lastTag && (
                      <>
                        <span className="badge badge--secondary margin-left--xs">
                          last tag: {r.lastTag}
                        </span>
                      </>
                    )}
                    {r.topics.map((t) => {
                      return (
                        <span
                          key={t}
                          className="badge badge--secondary margin-left--xs"
                        >
                          {t}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className={styles.centered}>
                  {new Date(r.pushed_at).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </td>
                <td className={styles.centered}>{r.teamOwner}</td>
                <td className={styles.centered}>{r.language}</td>
                <td>
                  <RepoBranches repo={r} />
                </td>

                {options["show-dependencies"] && (
                  <td>
                    <RepoDependencies packageFile={r.package} />
                  </td>
                )}
                {options["show-contributors"] && (
                  <td>
                    {r.contributors?.map((contributor, i) => {
                      return (
                        <>
                          <a
                            key={contributor.id}
                            target="_blank"
                            href={contributor.html_url}
                          >
                            {contributor.login}
                          </a>{" "}
                          ({contributor.contributions})
                          {i < r.contributors.length - 1 ? ", " : <></>}
                        </>
                      );
                    })}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ReposList;
