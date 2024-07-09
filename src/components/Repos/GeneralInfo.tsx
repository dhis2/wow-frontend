import { RepoType } from "@site/src/types/repos";

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

  return (
    <>
      <div className="alert alert--primary margin--md" role="alert">
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
    </>
  );
};

export default GeneralInfo;
