const graphql = (organisation, repo) => JSON.stringify({
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

export default graphql;
