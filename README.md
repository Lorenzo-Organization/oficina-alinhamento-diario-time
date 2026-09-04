# Quadro da manhã

Projeto da oficina de IA da Stefani Transporte e Logística.
Frente: **Alinhamento diário do time**.

## Para quem é

Para um time de cinco pessoas que depende do alinhamento da manhã para saber a prioridade do dia.
E para o líder desse time, que hoje precisa juntar todo mundo no mesmo horário.

## O problema em uma frase

Toda manhã tento alinhar o time, mas nem sempre consigo manter a reunião, e o dia começa cada um do seu jeito.

## O diagnóstico

O alinhamento depende de uma pessoa juntar todo mundo no mesmo horário.
Quando essa pessoa não consegue, o alinhamento não acontece.
O time fica sem saber o que muda hoje.
Sem registro, o que foi combinado ontem some.

## A solução: Quadro da manhã

### O que faz

É uma tela que o time abre de manhã.
Ela mostra, para cada pessoa, o que ela vai fazer hoje e o que travou ontem.
Cada um preenche seu quadrinho em um minuto, com três campos: fiz ontem, faço hoje, estou travado em.
O líder abre uma tela só e vê o time inteiro, mesmo sem reunião.

### O fluxo, passo a passo

1. Cada pessoa preenche três campos de manhã.
2. A tela guarda tudo numa planilha.
3. O líder abre a visão do time.
4. A tela destaca quem está travado.
5. O histórico da semana fica guardado.

### O que a tela automatiza

- Reunir todo mundo no mesmo horário.
- Cobrar cada um por mensagem.
- Lembrar o que foi combinado ontem.
- Montar o resumo da semana.

### O que continua manual

- Cada pessoa escrever suas três linhas.
- O líder resolver os travamentos.
- Conversar ao vivo quando precisar.

### O ganho

Cinco vezes por semana, 5 pessoas começam o dia sabendo a prioridade, mesmo quando a reunião não acontece.

### Como usar amanhã

Cada um abre a tela às 8h e escreve suas três linhas.
O líder olha o quadro do time e vai direto em quem está travado.

## As outras propostas

| Proposta | O que é | Esforço | Impacto |
| --- | --- | --- | --- |
| Quadro da manhã | Formulário de três campos por pessoa e uma tela com o time inteiro. | 2 | 4 |
| Resumo do alinhamento pronto | Texto curto gerado todo dia com o que cada um vai fazer e onde travou. O líder copia e manda no grupo. | 1 | 3 |
| Roteiro da reunião de 10 minutos | Tela com o roteiro fixo da reunião e um relógio por item. Qualquer pessoa puxa a reunião. | 1 | 3 |

Esforço vai de 1 (fácil) a 5 (difícil). Impacto vai de 1 (pouco) a 5 (muito).

## A entrega mínima de hoje

Um formulário de três campos por pessoa.
Uma página que lê a planilha de respostas e mostra o time de hoje lado a lado.
Quem está travado aparece em destaque.

Isso já está começado nesta pasta. Abra e teste antes de mudar.

## Como rodar

1. Abra o arquivo `index.html` no navegador (dois cliques nele).
2. Se a tela avisar que não conseguiu ler a planilha, abra um terminal nesta pasta e rode:

```
npx serve .
```

3. Depois abra no navegador o endereço que aparecer (normalmente `http://localhost:3000`).

## Sobre os dados

A planilha `dados/exemplo.csv` é **fictícia**.
Os nomes, as placas, as cidades e os textos foram inventados para o protótipo funcionar.
O grupo deve trocar pela planilha de verdade do time.
Mantenha o cabeçalho igual ao do exemplo para a tela continuar lendo.

Os cinco nomes do time ficam no começo do arquivo `app.js`, numa lista chamada `TIME`.
Troque pelos nomes reais.

## Como pedir para a IA

Copie um destes pedidos e cole no Claude Code.

**Pedido 1: trocar os nomes do time**

> Troca os cinco nomes do time no app.js pelos nomes reais: (escreva aqui os nomes e o que cada um faz). Mantém o resto igual.

**Pedido 2: gerar o resumo do dia**

> Cria um botão na tela que monta um texto curto com o que cada pessoa vai fazer hoje e onde está travada, pronto para eu copiar e mandar no grupo do WhatsApp. Uma linha por pessoa, sem enfeite.

**Pedido 3: guardar de verdade na planilha**

> Hoje as respostas ficam só no navegador. Quero que cada resposta nova vá para uma planilha que o time todo consiga abrir. Me explica as opções mais simples antes de mexer no código.
