# Projeto final — Plataforma ONG 



## Como subir para o GitHub (passo a passo rápido)
1. Crie o repositório público no GitHub (ex.: `ong-exemplo`).
2. No terminal do seu projeto local:
   ```bash
   git init
   git add .
   git commit -m "Entrega final: plataforma ONG - unidade HTML5"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
   git push -u origin main
   ```
3. Caso queira usar GitHub Pages (site estático):
   - A solução mais simples é ativar GitHub Pages nas configurações e apontar para a branch `main` e a pasta `/`.
   - Existe também um workflow (GitHub Actions) incluso que publica em `gh-pages` automaticamente quando você faz push na `main` (requer que você crie um token se quiser usar deploy protegido). Veja `.github/workflows/gh-pages.yml`.

## O que foi implementado
- Estrutura semântica HTML5 (header, main, sections, footer).
- 3 páginas válidas: `index.html`, `projetos.html`, `cadastro.html`.
- Formulário com validação HTML5, máscaras (CPF, telefone, CEP) e validação completa de CPF (algoritmo) em JavaScript.
- Preenchimento automático de endereço por CEP usando a API ViaCEP (client-side).
- Imagens otimizadas em SVG (substitua por fotos reais se desejar).
- CSS mobile-first e foco acessível.
- README com instruções de deploy.

## Observações finais
- Valide seus HTML em https://validator.w3.org/ antes de entregar.
- Substitua as imagens SVG por fotos otimizadas (webp/jpg) e adicione `srcset` para responsividade se desejar.
- Se quiser que eu gere o `commit` e o `push` (automatizar) eu preciso de acesso ao seu GitHub — se preferir, eu gero o conjunto de comandos exatos para colar no terminal (já incluso acima).
