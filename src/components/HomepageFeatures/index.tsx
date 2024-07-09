import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

type FeatureItem = {
  title: string;
  to: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Frontend Way of Working",
    to: "docs/way-of-working/platform-fe-wow",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        This document describes our process and general way of working in the
        frontend team.
      </>
    ),
  },
  {
    title: "DHIS2 Repos Catalog",
    to: "repos",
    Svg: require("@site/static/img/dhis2.svg").default,
    description: (
      <>
        This is a dynamically generated list of all DHIS2 repos highlighting
        their owners, release branches, dependencies etc..
      </>
    ),
  },
  {
    title: "Dev Guides",
    to: "docs/way-of-working/guides/testing/",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Guides and pattern libraries for Frontend developers to document the
        technical aspects of how we do things (testing, typescript etc..)
      </>
    ),
  },
];

function Feature({ title, Svg, description, to }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Link to={to}>
          <Svg className={styles.featureSvg} role="img" />
        </Link>
      </div>
      <div className="text--center padding-horiz--md">
        <Link to={to}>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
