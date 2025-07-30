import { RepoOwnerType, RepoType } from "@site/src/types/repos";

// ToDo: add tags in GitHub instead of this hardcoded list
const owners = {
  analytics: [
    "analytics",
    "push-analytics",
    "dashboard-app",
    "data-visualizer-app",
    "line-listing",
    "line-listing-app",
    "maps-app",
    "maps-gl",
    "external-layers",
    "pivot-tables-app",
    "gis-app",
    "maps-deck-gl",
    "gis-api",
    "climate-import-app",
    "event-reports-app",
    "event-charts-app",
    "charts-app",
    "who-immunization-analysis-app",
    "maps-climate-pilot-app",
    "climate-data-app",
    "event-visualizer-app"
  ],
  extensibility: [
    "app-platform",
    "app-runtime",
    "ui",
    "datastore-app",
    "route-manager-app",
    "fhir-ig-generator-app",
    "reference-org-unit-sync",
    "reference-civil-registry-lookup",
    "app-management-app",
    "app-hub",
    "d2-i18n",
    "action-semantic-release"
  ],
  tracker: [
    "capture-app",
    "tracker-capture-app",
    "event-capture-app",
    "capture-core",
    "dhis2-android-capture-app",
    "tracker-capture-app",
    "d2-tracker",
    "dhis2-android-trackercapture",
  ],
  training: [
    "training-docs",
    "dhis2-trainingland",
    "academy-dhis2-fundamentals",
    "academy-web-app-dev-2022",
    "academy-account-signup",
    "academy-web-app-dev-2021",
    "academy-web-app-dev-2020",
    "academy-dhis2-events-fundamentals",
    "dev-academy-2017",
    "dev-academy-analytics",
    "developer-portal",
    "hacktoberfest",
    "dhis2-docs",
    "dhis2-docs-implementation",
    "dhis2-docs-translations",
    "cli-utils-docsite",
  ],
  android: [
    "dhis2-mobile-ui",
    "apk-distribution-app",
    "use-case-configuration",
  ],
  backend: [
    "wow-backend",
    "dhis2-server-tools",
    "dhis2-fhir-ig",
    "dhis2-server-setup",
    "docker-compose-examples",
    "dhis2-helix-etl",
    "dhis2-icons",
    "postgres-contrib",
    "metadata-package",
    "expression-parser",
  ],
  ux: ["dhis2org-prototype", "design-specs", "design-system"],
  qa: [
    "e2e-tests",
    "transifex-ci",
    "agent-js-cypress",
    "regression-testing",
    "performance-tests-jmeter",
    "dhis2-releases",
    "translation-linker",
    "d2-cluster-docker-compose",
  ],
  deprecated: ["academy-web-app-dev-2020", "app-service-datastore"],
  others: [
    "bedrock",
    "bot",
    "s3-sync-action",
    "allure-report-aggregator",
    "maven-repo-mirror",
    "action-dhis2-jira-automation",
    "dhis2-identity",
    "cicd-dashboard",
    "dhis2-tools",
    "social-media-video-app",
    "sl-demo-db-utilities",
    "dhis2-api-contract-test",
    "gf-adex-metadata",
    "dhis2-in-action",
    "metadata-integrity-app",
    "who-data-quality-app",
    "scratch-actions-sandbox",
    "dhis2.github.io",
    "gf-adex-flow-app",
    "metadata-package-development",
    "who-metadata-browser-app",
    "action-instance-version",
    "action-supported-legacy-versions",
    "workflow-app-verify-commits",
    "deploy-build",
    ".github",
    "metadata-buffer",
    "signed-commits-test",
    "threat-model",
    "chap-app",
    "workflows-test",
    "wow-frontend",
  ],
};

export const findOwner = (
  repo: RepoType,
  deprecated = false
): RepoOwnerType => {
  if (deprecated) return "deprecated";

  const { name: repoName, language, pushed_at: pushedDate, topics } = repo;

  // we can define owner by adding a tag starting with team-, i.e. team-platform
  const ownerTopic = topics?.find((t) => t.startsWith("team-"));
  if (ownerTopic) {
    return ownerTopic.replace("team-", "") as RepoOwnerType;
  }

  if (pushedDate < "2021") return "others";

  for (const key of Object.keys(owners) as Array<keyof typeof owners>) {
    if (owners[key].includes(repoName)) {
      return key;
    }
  }
  if (repoName.match(/(android|kotlin)/i)) return "android";
  if (language?.match(/^(java|R|python)$/i)) return "backend";
  if (repoName.match(/^tool-/i)) return "others";
  if (repoName.match(/docker/i)) return "others";
  if (repoName.match(/^cli-/i)) return "extensibility";
  
  return "platform";
};
