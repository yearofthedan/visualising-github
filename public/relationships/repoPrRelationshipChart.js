import {doQuery} from "../graphQLQuery.js";
import renderForceGraphChart from "../chartRenderers/forceGraphChart.js";

const graphqlQuery = (organisation, repo) => JSON.stringify({
  query: `{
    repository(owner: "${organisation}", name: "${repo}") {
      name
      pullRequests(last: 100, states: MERGED) {
        nodes {
          author {
            login
          }
          reviews(states: APPROVED, first: 5) {
            nodes {
              author {
                login
              }
            }
          }
        }
      }
    }
  }`,
  variables: {}
});

const mapQueryResultToChartData = (queryResult) => {
  const buildingChartData = {
    nodes: new Set(),
    links: new Map(),
  }

  const deriveKey = (str1, str2) => {
    return str1 < str2 ? `${str1}${str2}` : `${str2}${str1}`
  }

  queryResult.repository.pullRequests.nodes
  .forEach(pr => {
    pr.reviews.nodes.forEach(review => {
      buildingChartData.nodes.add(review.author.login)
      buildingChartData.nodes.add(pr.author.login)

      const key = deriveKey(review.author.login, pr.author.login);

      if (buildingChartData.links.has(key)) {
        const current = buildingChartData.links.get(key);

        buildingChartData.links.set(key, {
          ...current,
          value: current.value + 1
        })
      } else {
        buildingChartData.links.set(key, {
          source: review.author.login,
          target: pr.author.login,
          value: 1
        })
      }
    })
  });

  return {
    nodes: Array.from(buildingChartData.nodes).map(name => ({id: name})),
    links: Array.from(buildingChartData.links.values())
  };
}

const createRepoPrRelationshipChart = async (organisation, repository) => {
  doQuery(graphqlQuery(organisation, repository))
    .then(mapQueryResultToChartData)
    .then(renderForceGraphChart);
}

export default createRepoPrRelationshipChart;
