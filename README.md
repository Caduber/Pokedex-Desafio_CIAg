# Super Pokédex - Desafio CIAg

<img width="1898" height="930" alt="image" src="https://github.com/user-attachments/assets/983552c1-5acc-4fd7-9296-129279a41639" />

### Atenção - Há 2 branches neste repositório, uma com armazenamento local e outra com banco de dados ⚠️
_O Readme aborda a instalação e tecnologias de ambas as branches 😎_

# Sobre o projeto 📖
Este projeto foi desenvolvido em 4 dias, como parte do desafio proposto pelo CIAg com o intuíto de verificar meus conhecimentos e pô-los em prova em um curto espaço de tempo.

# Funcionalidades Implementadas ☝🤓
- Visualização dos pokemons até a geração 9 (mais recente).
- Visualização com id, nome, sprite, habilidades, tipos e atributos. 
- Barra de pesquisa por nome, número na pokedex e tipagem.
- Seletor de limite de pokemons (por geração).
- Adicionar, remover e listar favoritos.
- Editar notas pessoais na aba de favoritos.
- Persistência local de dados (com local storage).
- Responsividade para dispositivos móveis.
------------------------------------
- Api para comunicação com o banco de dados.

# Tecnologias usadas 💪🧠
- HTML e CSS para marcação e estilização.
- Javascript (e fetch api) para responsividade, lógica e consumo da api.
- PokeAPI como fonte de dados.
- Lenis para um scroll mais suave.
- Local Storage para persistência local de dados.
- Git e Github para controle de versão.
------------------------------------
- Express.js para roteamento.
- Sqlite para persistência de dados.
- Node.js no backend (npm como gerenciador de pacotes).

# Como utilizar 👨‍💻
### _Armazenamento Local_
1. Acesse o site por meio do link: 🔗[https://caduber.github.io/Pokedex-Desafio_CIAg/index.html](url)
> Alternativamente, baixe o .zip e abra o arquivo "index.html".
2. Na parte superior direita, escolha as gerações que deseja trabalhar.
3. Selecione a tipagem de pokemon que deseja filtrar pelos ícones, ou procure por algum pokemon em específico.
4. Coloque o ponteiro do mouse sobre ele para verificar seus status.
5. Clique na estrela no canto inferior direito.
6. Coloque o id (número da pokedex) dos pokemons que deseja adicionar aos favoritos na entrada "Adicionar (ID)".
7. Caso deseje, filtre por nome, id ou tipo na barra de pesquisa.
8. Remova os pokemons que não forem mais interessantes, use a entrada "Remover (ID)" e insira o id desejado.
9. Adicione anotações ao clicar no botão "Anotações", não se esqueça de salvar antes de fechar 😉.

### _Banco de Dados_
1. Acesse a branch "VersaoBanco"
2. Certifique-se de que o npm e node instalados na máquina.
3. Certifique-se de que também possui o sqlite instalado.
4. Baixe o .zip aqui no Github.
5. Na pasta raiz, execute "npm install".
6. Execute "npm start" ou "node server" na linha de comandos.
_(certifique-se de estar no diretório raiz dos arquivos)_
7. Abra o arquivo "index.html"
8. Na parte superior direita, escolha as gerações que deseja trabalhar.
9. Selecione a tipagem de pokemon que deseja filtrar pelos ícones, ou procure por algum pokemon em específico.
10. Coloque o ponteiro do mouse sobre ele para verificar seus status.
11. Clique na estrela no canto inferior direito.
12. Para adicionar um pokemon aos favoritos, coloque o número da pokedex dele em "Número de Pokedéx (ID)".
13. Adicionalmente é possível anexar uma anotação àquele pokemon.
14. Clique em "Adicionar" para inserir na base de dados.
15. Para editar uma descrição de um pokemon, coloque seu id no campo "Número de Pokedéx (ID)".
16. Além disso, coloque a nova anotação em "Anotação" e clique em "Atualizar".
17. Para remover um pokemon da base de dados, apenas coloque o seu número da pokedex em "Número de Pokedéx (ID)".
18. Para terminar a deleção, clique em "Remover".


🙏 Agradecimentos

CIAg pelo desafio proposto e PokéAPI pela API gratuita e completa
