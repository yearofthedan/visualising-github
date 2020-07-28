const graphql = (organisation) => JSON.stringify({
  query: `{
          repositoryOwner(login: "${organisation}") {
            repositories(first: 10) {
              nodes {
                name
                pullRequests(last: 40, states: MERGED) {
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
            }
          }

        }`,
  variables: {}
});

export default graphql;
