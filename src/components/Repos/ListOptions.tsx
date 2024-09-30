import clx from "clsx";
import styles from "./index.module.css";
import { RepoOwnerType } from "@site/src/types/repos";

export type ListOptionsType = {
  "show-dependencies": boolean;
  "show-contributors": boolean;
  "show-webapps-only": boolean;
  "current-team": RepoOwnerType;
};

type ListOptionsProps = {
  setOptions: React.Dispatch<React.SetStateAction<ListOptionsType>>;
  options: ListOptionsType;
  owners: Record<RepoOwnerType, number>;
};

const displayValues: Record<RepoOwnerType, string> = {
  all: "All",
  extensibility: "Extensibility",
  analytics: "Analytics",
  android: "Mobile",
  backend: "Backend",
  others: "Others",
  platform: "Platform",
  qa: "QA",
  tracker: "Tracker",
  training: "Docs & Training",
  ux: "UX",
  deprecated: "Deprecated",
};

const order: RepoOwnerType[] = [
  "all",
  "platform",
  "analytics",
  "tracker",
  "extensibility",
  "android",
  "backend",
  "ux",
  "qa",
  "training",
  "others",
  "deprecated",
];

const ListOptions = (props: ListOptionsProps) => {
  const { options, setOptions, owners: allOwners } = props;
  const updateOptions: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setOptions({
      ...options,
      [event.currentTarget.name]: !options[event.currentTarget.name],
    });
  };

  const owners = Object.keys(allOwners);

  const teams: Record<string, RepoOwnerType> = {
    all: "all",
    ...Object.keys(owners).reduce((prev, curr) => {
      return {
        ...prev,
        [owners[curr]]: owners[curr],
      };
    }, {}),
  };

  const setCurrentTeam = (team: RepoOwnerType) => {
    const showDependencies =
      team === "analytics" || team === "platform" || team === "tracker";

    setOptions({
      ...options,
      "show-dependencies": showDependencies,
      "current-team": team,
    });
  };

  return (
    <>
      <ul className={clx("tabs", styles.tabs)}>
        {Object.keys(teams)
          .sort(
            (a: RepoOwnerType, b: RepoOwnerType) =>
              order.indexOf(a) - order.indexOf(b)
          )
          .map((t) => (
            <li
              id={t}
              className={clx({
                "tabs__item ": true,
                "tabs__item--active": teams[t] === options["current-team"],
              })}
              onClick={() => setCurrentTeam(teams[t])}
            >
              {displayValues[t] ?? t}{" "}
              {allOwners[t] ? <>({allOwners[t]})</> : ""}
            </li>
          ))}
      </ul>

      <button
        className={clx({
          button: true,
          "button--success": options["show-dependencies"],
          "button--secondary": !options["show-dependencies"],
        })}
        name="show-dependencies"
        onClick={updateOptions}
      >
        {!options["show-dependencies"]
          ? "Show Dependencies"
          : "Hide Dependencies"}
      </button>
      <button
        className={clx({
          "button margin-left--sm": true,
          "button--success": options["show-webapps-only"],
          "button--secondary": !options["show-webapps-only"],
        })}
        name="show-webapps-only"
        onClick={updateOptions}
      >
        {!options["show-webapps-only"]
          ? "Hide libraries (web apps only)"
          : "Show libraries"}
      </button>
      <button
        className={clx({
          "button margin-left--sm": true,
          "button--success": options["show-contributors"],
          "button--secondary": !options["show-contributors"],
        })}
        name="show-contributors"
        onClick={updateOptions}
      >
        {!options["show-contributors"]
          ? "Show contributors"
          : "Hide contributors"}
      </button>
    </>
  );
};

export default ListOptions;
