const graphql = (organisation) => JSON.stringify({
  query: `{
          repositoryOwner(login: "${organisation}") {
            repositories(first: 20) {
              nodes {
                name
                pullRequests(last: 50, states: MERGED) {
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
