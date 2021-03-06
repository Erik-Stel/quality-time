"""Jacoco Jenkins plugin coverage report collector."""

from typing import Tuple

from collector_utilities.type import Entities, Responses, URL, Value

from base_collectors import JenkinsPluginSourceUpToDatenessCollector, SourceCollector


class JacocoJenkinsPluginBaseClass(SourceCollector):
    """Base class for Jacoco Jenkins plugin collectors."""

    async def _landing_url(self, responses: Responses) -> URL:
        return URL(f"{await super()._api_url()}/lastSuccessfulBuild/jacoco")


class JacocoJenkinsPluginCoverageBaseClass(JacocoJenkinsPluginBaseClass):
    """Base class for Jacoco Jenkins plugin coverage collectors."""

    coverage_type = "subclass responsibility"

    async def _api_url(self) -> URL:
        return URL(f"{await super()._api_url()}/lastSuccessfulBuild/jacoco/api/json")

    async def _parse_source_responses(self, responses: Responses) -> Tuple[Value, Value, Entities]:
        line_coverage = (await responses[0].json())[f"{self.coverage_type}Coverage"]
        return str(line_coverage["missed"]), str(line_coverage["total"]), []


class JacocoJenkinsPluginUncoveredLines(JacocoJenkinsPluginCoverageBaseClass):
    """Collector for Jacoco Jenkins plugin uncovered lines."""

    coverage_type = "line"


class JacocoJenkinsPluginUncoveredBranches(JacocoJenkinsPluginCoverageBaseClass):
    """Collector for Jacoco Jenkins plugin uncovered branches."""

    coverage_type = "branch"


class JacocoJenkinsPluginSourceUpToDateness(JacocoJenkinsPluginBaseClass, JenkinsPluginSourceUpToDatenessCollector):
    """Collector for the up to dateness of the Jacoco Jenkins plugin coverage report."""
