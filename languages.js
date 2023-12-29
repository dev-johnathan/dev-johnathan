const fetch = require('node-fetch');

const username = 'dev-johnathan'; // Substitua pelo seu nome de usuário do GitHub

async function fetchLanguages() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();

    const languages = {};

    repos.forEach(repo => {
      const repoLanguages = repo.language;
      if (repoLanguages) {
        if (languages[repoLanguages]) {
          languages[repoLanguages]++;
        } else {
          languages[repoLanguages] = 1;
        }
      }
    });

    console.log('Linguagens usadas nos repositórios:');
    console.log(languages);
  } catch (error) {
    console.error('Erro ao recuperar informações do GitHub API:', error.message);
  }
}

fetchLanguages();
