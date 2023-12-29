const fetch = require('node-fetch');
const fs = require('fs').promises;

console.log('Iniciando script...');

const username = 'dev-johnathan'; // Substitua pelo seu nome de usuário do GitHub

async function fetchLanguages() {
  try {
    console.log('Obtendo repositórios do GitHub API...');
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();

    const languages = {};

    console.log('Analisando repositórios...');
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

    const output = Object.entries(languages)
      .map(([language, count]) => `- ${language}: ${count}`)
      .join('\n');

    console.log('Escrevendo em languages-output.md...');
    await fs.writeFile('languages-output.md', output);
    console.log('Concluído.');
  } catch (error) {
    console.error('Erro ao recuperar informações do GitHub API:', error.message);
  }
}

fetchLanguages();
