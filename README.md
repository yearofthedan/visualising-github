#Visualising Github

Playing with the GitHub GraphQL API + D3

## Prereqs
This uses js modules so needs to be run from a local server. 

- If you're of a js persuasion `npx http-server` will serve it up
- Or python aware `python -m SimpleHTTPServer` should do the trick

You also need a github token: 
https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token

The token is placed in `public/secret/token.js/` which is gitignored. 
This only works for a local run. DO NOT deploy a version with the token as you will expose it publicly.  

