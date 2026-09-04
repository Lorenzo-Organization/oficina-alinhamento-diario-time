# CLAUDE.md

## O que é e para quem

Quadro da manhã: uma tela onde cada pessoa do time escreve três linhas de manhã (fiz ontem, faço hoje, travado em) e o líder vê o time inteiro sem precisar de reunião.
É para um time de cinco pessoas da Stefani Transporte e Logística e para o líder desse time.
Quem usa não é de tecnologia. Tudo deve ser simples.

## Como rodar

Abrir `index.html` no navegador.
Se a planilha não carregar, rodar `npx serve .` nesta pasta e abrir o endereço que aparecer.
Não tem instalação, não tem banco de dados, não tem biblioteca externa.

## Onde ficam as coisas

- `index.html`: a tela.
- `estilo.css`: as cores e os tamanhos.
- `app.js`: o que a tela faz. A lista `TIME` com os cinco nomes fica no começo.
- `dados/exemplo.csv`: planilha fictícia de exemplo. Trocar pela de verdade.
- `README.md`: explicação completa do projeto.
- `TAREFAS.md`: a lista do que fazer nos 70 minutos.
- `DIARIO.md`: o diário de bordo. Anotar ao final de cada sessão.

## O que nunca mexer

- Os três campos são sempre estes e nesta ordem: fiz ontem, faço hoje, travado em. Não criar campo novo sem o grupo combinar.
- Cada pessoa preenche só o próprio quadrinho. A tela não preenche por ninguém.
- Quem está travado tem que aparecer em destaque. Isso é o motivo da tela existir.
- A tela não resolve travamento. Isso é o líder que faz, ao vivo.
- O histórico dos dias anteriores não pode ser apagado ao guardar uma resposta nova.
- Regras da empresa que só o time sabe (horário de preenchimento, quem faz parte do time, o que conta como travado): **o grupo deve preencher aqui**.

## Como a gente fala

- Laranja da marca: `#FF8A1F`. Usar nos destaques e nos botões.
- Textos em português, simples, sem jargão.
- Chamar de "entrega", nunca de "pedido".
- Tela legível de longe: letras grandes, poucos elementos, cabe em 1280 por 720 sem rolar o essencial.
