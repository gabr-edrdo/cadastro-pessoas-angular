# Interface web para cadastro e gerenciamento de pessoas

O projeto trata de um desafio técnico que tinha por objetivo:

> Desenvolver uma aplicação web simples para cadastro e gerenciamento de pessoas utilizando Angular no front-end e Java Spring Boot no back-end. A aplicação deve permitir o cadastro de pessoas com validação de CPF no front-end e preenchimento automático de endereço via CEP, além da listagem, pesquisa e gerenciamento dos registros cadastrados. O armazenamento dos dados deve ser realizado em um banco de dados SQLite.

Portanto, aqui está descrita a implementação do front-end utilizando Angular.
O demo da aplicação pode ser conferido [aqui](https://gabr-edrdo.github.io/cadastro-pessoas-angular). Devido à API estar hospedada em um plano *freemium* via contêiner, os dados persistentes (cadastros) são resetados a cada período de inatividade, que gera uma nova inicialização. Ao executar localmente, tais limitações não se aplicam.

## 🚀 Começando

### 📋 Pré-requisitos

- Node.JS 20^
- NPM 10^
- Angular CLI 18^

### 🔧 Instalação

O clone do repositório trará todos os arquivos necessários para a execução do projeto, sendo apenas necessária a instalação das dependências via NPM (declaradas no arquivo *package.json*).
Para a execução local o comando de execução é:
```sh
ng serve
```
Desse modo, a aplicação estará executando localmente, na porta indicada no terminal (padrão *localhost:4200*).
Para a hospedagem no GitHub Pages é necessário o *build* e *deploy* da aplicação, para isso utilizei o pacote *angular-cli-ghpages*, instruções pode ser encontradas [aqui](https://www.youtube.com/watch?v=7KUWa_-GH18).

## 📦 Implementação

Rotas da aplicação:
- */pessoas* com a listagem de pessoas
- */pessoas/novo* formulário de cadastro
- */pessoas/{id}* edição do cadastro

## 🛠️ Construído com
	
* [Angular](https://angular.dev/) - Framework web
* [Angular Material](https://material.angular.io/) - Componentes para o framework web
* [Typescript](https://www.typescriptlang.org/) - Linguagem de programação tipada
* [Node.JS](https://nodejs.org/en) - Runtime Javascript

## 📌 Dependências
Lista das pricipais dependências do projeto:
-   **@angular/animations**: fornece suporte a animações.
    
-   **@angular/cdk**: fornece funcionalidades para desenvolver componentes personalizados.
    
-   **@angular/forms**: biblioteca para trabalhar com formulários reativos.
    
-   **@angular/material**: fornece componentes de interface.
    
-   **@angular/router**: responsável pelo roteamento da aplicação.
    
-   **ngx-mask**: biblioteca para criar máscaras de entrada em campos de formulário.

## 📄 Licença

[MIT](https://choosealicense.com/licenses/mit/).

## 🎁 Agradecimentos

Como desenvolvedor, utilizo Javascript diariamente em aplicações web, mas o Angular foi um desafio em relação aquilo que temos como práticas "padrão" com Javascript puro ou Alpine.js. Nesse trajeto alguns materiais foram extremamente úteis: 
* [Código Fonte TV](https://www.youtube.com/watch?v=Yf0rC7dERjg) por apresentar um ponto de partida.
* [Fernanda Kipper](https://www.youtube.com/watch?v=e4OLH13mVKc) por novamente ensinar de modo prático.
