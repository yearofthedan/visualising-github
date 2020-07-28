import {githubToken} from './secret/token.js';

export const doQuery = async (query) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${githubToken}`);
  myHeaders.append("Content-Type", "application/json");

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: 'POST',
      headers: myHeaders,
      body: query,
      redirect: 'follow'
    }).then(response => response.json());
    return response.data;
  } catch(error) {
    console.log('error', error);
  }
}
