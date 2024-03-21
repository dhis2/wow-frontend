import { RepoType } from "@site/src/types/repos";
import { useState } from "react";

type GeneralInfoProps = {
  repos: RepoType[];
};
const GeneralInfo = ({ repos }: GeneralInfoProps) => {
  const byLanguage = repos.reduce((prev, curr) => {
    const { language } = curr;
    const result = {
      ...prev,
    };
    if (language) {
      result[language] =
        result[language] === undefined ? 1 : result[language] + 1;
    }
    return result;
  }, {});

  // const deprecated = repos.filter((r) => r.deprecated);
  const continuouslyDeliveredApps = repos.filter(
    (r) => r.isContinuouslyDelivered
  );
  const webApps = repos.filter((r) => r.type === "web-app");
  const webLibraries = repos.filter((r) => r.type === "web-lib");

  const old = repos.filter((r) => r.pushed_at < "2021");

  const [isClosed, close] = useState(false);

  return (
    <>
      <div className="alert alert--primary margin--md" role="alert">
        {/* <button aria-label="Close" className="clean-btn close" type="button">
      <span aria-hidden="true">&times;</span>
    </button> */}
        {/* <button aria-label="Close" className="clean-btn close" type="button">
      <span aria-hidden="true">&times;</span>
    </button> */}
        <div>
          <div>
            {repos.length} projects in total.
            {!!continuouslyDeliveredApps.length && (
              <div>
                {webApps.length} web apps ({continuouslyDeliveredApps.length}{" "}
                are continuously delivered).
              </div>
            )}
            {!!webLibraries.length && (
              <div>{webLibraries.length} web libraries.</div>
            )}
          </div>
          <div className="margin-top--md">
            {Object.keys(byLanguage)
              .map((k) => {
                return `${k} (${byLanguage[k]})`;
              })
              .map((val) => {
                return (
                  <span className="badge badge--primary margin-right--xs">
                    {val}
                  </span>
                );
              })}
          </div>
        </div>
      </div>
      {!isClosed && (
        <div className="alert alert--warning margin--md" role="alert">
          <button
            aria-label="Close"
            onClick={() => close(true)}
            className="clean-btn close"
            type="button"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          You can override the repo's owner by adding a tag starting with
          "team-" to the GitHub repo (i.e. team-platform). These tags are
          dynamic and you can define any values (i.e. team-implementation).{" "}
          <br />
          This is still work in progress. Some of the other info we'll surface
          here: Test coverage, the last commits on release branches (to help
          with tracking backports) etc..
          <br />
        </div>
      )}
    </>
  );
};

export default GeneralInfo;
