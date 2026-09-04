// Quadro da manhã · Stefani Transporte e Logística
//
// O que este arquivo faz:
// 1. Lê a planilha dados/exemplo.csv.
// 2. Junta com as respostas guardadas no navegador (localStorage).
// 3. Mostra os números do dia, o quadro do time e o formulário.
//
// Tudo sem biblioteca externa. Só o navegador.

// ---------- O time ----------
// Troque estes nomes pelos nomes reais. O nome precisa ser igual ao da planilha.
const TIME = [
  { nome: "Marcos Vinícius", funcao: "Programação de cargas" },
  { nome: "Ana Paula", funcao: "Faturamento" },
  { nome: "Roberto", funcao: "Manutenção da frota" },
  { nome: "Juliana", funcao: "Expedição" },
  { nome: "Carlos Eduardo", funcao: "Atendimento ao cliente" },
];

// Nome usado para guardar as respostas no navegador
const CHAVE_LOCAL = "quadro-da-manha-respostas";

// Onde está a planilha
const ARQUIVO_PLANILHA = "dados/exemplo.csv";

// ---------- Estado da tela ----------
let respostasDaPlanilha = []; // o que veio do CSV
let diaSelecionado = "";      // dia que o quadro está mostrando (formato 2026-09-04)
let textoBusca = "";          // o que a pessoa digitou na busca

// ---------- Elementos da tela ----------
const seletorDia = document.getElementById("seletor-dia");
const campoBusca = document.getElementById("busca");
const aviso = document.getElementById("aviso");
const numPreencheram = document.getElementById("num-preencheram");
const numTravados = document.getElementById("num-travados");
const numFaltam = document.getElementById("num-faltam");
const form = document.getElementById("form-quadrinho");
const campoNome = document.getElementById("campo-nome");
const campoFizOntem = document.getElementById("campo-fiz-ontem");
const campoFacoHoje = document.getElementById("campo-faco-hoje");
const campoTravado = document.getElementById("campo-travado");
const formularioData = document.getElementById("formulario-data");
const formularioOk = document.getElementById("formulario-ok");
const botaoLimpar = document.getElementById("botao-limpar");
const quadroTitulo = document.getElementById("quadro-titulo");
const cartoes = document.getElementById("cartoes");

// ---------- Datas ----------

// Devolve a data de hoje no formato 2026-09-04
function hojeISO() {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

// Transforma 2026-09-04 em "sex, 04/09/2026"
function formatarData(iso) {
  const [ano, mes, dia] = iso.split("-").map(Number);
  const data = new Date(ano, mes - 1, dia);
  const diasSemana = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  return `${diasSemana[data.getDay()]}, ${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")}/${ano}`;
}

// ---------- Leitura da planilha ----------

// Lê um texto CSV e devolve uma lista de objetos.
// Entende campos entre aspas, que podem ter vírgula dentro.
function lerCSV(texto) {
  const linhas = [];
  let linha = [];
  let campo = "";
  let dentroDeAspas = false;

  for (let i = 0; i < texto.length; i++) {
    const letra = texto[i];

    if (dentroDeAspas) {
      if (letra === '"' && texto[i + 1] === '"') {
        campo += '"'; // duas aspas seguidas viram uma aspa
        i++;
      } else if (letra === '"') {
        dentroDeAspas = false;
      } else {
        campo += letra;
      }
    } else if (letra === '"') {
      dentroDeAspas = true;
    } else if (letra === ",") {
      linha.push(campo);
      campo = "";
    } else if (letra === "\n" || letra === "\r") {
      if (letra === "\r" && texto[i + 1] === "\n") i++;
      linha.push(campo);
      linhas.push(linha);
      linha = [];
      campo = "";
    } else {
      campo += letra;
    }
  }
  // última linha, se o arquivo não terminar com quebra de linha
  if (campo !== "" || linha.length > 0) {
    linha.push(campo);
    linhas.push(linha);
  }

  // A primeira linha é o cabeçalho. As outras viram objetos.
  const cabecalho = linhas[0].map((c) => c.trim());
  return linhas
    .slice(1)
    .filter((l) => l.length > 1 && l.some((c) => c.trim() !== ""))
    .map((l) => {
      const objeto = {};
      cabecalho.forEach((coluna, indice) => {
        objeto[coluna] = (l[indice] || "").trim();
      });
      return objeto;
    });
}

// Busca a planilha. Se não conseguir, mostra o aviso.
async function carregarPlanilha() {
  try {
    const resposta = await fetch(ARQUIVO_PLANILHA);
    if (!resposta.ok) throw new Error("Resposta " + resposta.status);
    const texto = await resposta.text();
    respostasDaPlanilha = lerCSV(texto);
    aviso.hidden = true;
  } catch (erro) {
    respostasDaPlanilha = [];
    aviso.hidden = false;
    aviso.innerHTML =
      "Não consegui ler a planilha <code>dados/exemplo.csv</code>. " +
      "O navegador bloqueia a leitura de arquivo quando a página é aberta direto da pasta. " +
      "Abra um terminal nesta pasta, rode <code>npx serve .</code> e entre no endereço que aparecer. " +
      "Enquanto isso, o formulário funciona e guarda no navegador.";
  }
}

// ---------- Respostas guardadas no navegador ----------

function lerSalvas() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_LOCAL) || "[]");
  } catch (erro) {
    return [];
  }
}

function guardarSalvas(lista) {
  localStorage.setItem(CHAVE_LOCAL, JSON.stringify(lista));
}

// Guarda uma resposta nova. Se a pessoa já respondeu nesse dia, substitui.
function salvarResposta(nova) {
  const lista = lerSalvas().filter(
    (r) => !(r.nome === nova.nome && r.data === nova.data)
  );
  lista.push(nova);
  guardarSalvas(lista);
}

// ---------- Juntando tudo ----------

// Todas as respostas: planilha + navegador.
// Se a mesma pessoa tem resposta nos dois no mesmo dia, vale a do navegador (é a mais nova).
function todasAsRespostas() {
  const salvas = lerSalvas();
  const daPlanilha = respostasDaPlanilha.filter(
    (p) => !salvas.some((s) => s.nome === p.nome && s.data === p.data)
  );
  return daPlanilha.concat(salvas);
}

// Lista de dias que têm alguma resposta, do mais novo para o mais antigo.
// O dia de hoje sempre entra, mesmo sem resposta.
function diasDisponiveis() {
  const dias = new Set(todasAsRespostas().map((r) => r.data));
  dias.add(hojeISO());
  return Array.from(dias).sort().reverse();
}

// Respostas do dia selecionado
function respostasDoDia() {
  return todasAsRespostas().filter((r) => r.data === diaSelecionado);
}

// Diz se uma resposta tem algo travando
function estaTravado(resposta) {
  return resposta && resposta.travado_em && resposta.travado_em.trim() !== "";
}

// ---------- Desenhando a tela ----------

function desenharSeletorDia() {
  const hoje = hojeISO();
  seletorDia.innerHTML = "";
  diasDisponiveis().forEach((dia) => {
    const opcao = document.createElement("option");
    opcao.value = dia;
    opcao.textContent = dia === hoje ? "Hoje, " + formatarData(dia) : formatarData(dia);
    seletorDia.appendChild(opcao);
  });
  seletorDia.value = diaSelecionado;
}

function desenharNumeros() {
  const doDia = respostasDoDia();
  // conta só quem faz parte do time
  const nomesDoTime = TIME.map((p) => p.nome);
  const preencheram = doDia.filter((r) => nomesDoTime.includes(r.nome));
  const travados = preencheram.filter(estaTravado);

  numPreencheram.textContent = `${preencheram.length} de ${TIME.length}`;
  numTravados.textContent = travados.length;
  numFaltam.textContent = TIME.length - preencheram.length;

  const hoje = hojeISO();
  quadroTitulo.textContent =
    diaSelecionado === hoje ? "O time hoje" : "O time em " + formatarData(diaSelecionado);
}

// Monta um cartão de uma pessoa
function montarCartao(pessoa, resposta) {
  const cartao = document.createElement("article");
  cartao.className = "cartao";

  // texto usado pela busca: nome, placa, cidade e o que foi escrito
  const textoParaBusca = [
    pessoa.nome,
    pessoa.funcao,
    resposta && resposta.fiz_ontem,
    resposta && resposta.faco_hoje,
    resposta && resposta.travado_em,
    resposta && resposta.placa,
    resposta && resposta.cidade,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (textoBusca && !textoParaBusca.includes(textoBusca)) {
    cartao.classList.add("escondido");
  }

  // Pessoa ainda não preencheu
  if (!resposta) {
    cartao.classList.add("vazio");
    cartao.innerHTML = `
      <div class="cartao-nome">${pessoa.nome}</div>
      <div class="cartao-funcao">${pessoa.funcao}</div>
      <p class="cartao-aviso">Ainda não preencheu</p>
    `;
    return cartao;
  }

  const travado = estaTravado(resposta);
  if (travado) cartao.classList.add("travado");

  const extras = [];
  if (resposta.placa) extras.push(`<span>${resposta.placa}</span>`);
  if (resposta.cidade) extras.push(`<span>${resposta.cidade}</span>`);
  if (resposta.litros) extras.push(`<span>${Number(resposta.litros).toLocaleString("pt-BR")} L</span>`);

  cartao.innerHTML = `
    <div class="cartao-topo">
      <div>
        <div class="cartao-nome">${pessoa.nome}</div>
        <div class="cartao-funcao">${pessoa.funcao}</div>
      </div>
      ${travado ? '<span class="cartao-etiqueta">Travado</span>' : ""}
    </div>
    <div class="cartao-linha">
      <span>Fiz ontem</span>
      <p>${resposta.fiz_ontem || "—"}</p>
    </div>
    <div class="cartao-linha">
      <span>Faço hoje</span>
      <p>${resposta.faco_hoje || "—"}</p>
    </div>
    <div class="cartao-linha travado-em">
      <span>Travado em</span>
      <p>${travado ? resposta.travado_em : "Nada travando"}</p>
    </div>
    ${extras.length ? `<div class="cartao-extras">${extras.join("")}</div>` : ""}
  `;
  return cartao;
}

function desenharQuadro() {
  const doDia = respostasDoDia();
  cartoes.innerHTML = "";

  // Um cartão por pessoa do time, sempre na mesma ordem.
  // Quem está travado vai para o começo, para o líder ver primeiro.
  const ordenado = TIME.slice().sort((a, b) => {
    const ra = doDia.find((r) => r.nome === a.nome);
    const rb = doDia.find((r) => r.nome === b.nome);
    return (estaTravado(rb) ? 1 : 0) - (estaTravado(ra) ? 1 : 0);
  });

  let visiveis = 0;
  ordenado.forEach((pessoa) => {
    const resposta = doDia.find((r) => r.nome === pessoa.nome);
    const cartao = montarCartao(pessoa, resposta);
    if (!cartao.classList.contains("escondido")) visiveis++;
    cartoes.appendChild(cartao);
  });

  if (visiveis === 0) {
    const vazio = document.createElement("p");
    vazio.className = "sem-resultado";
    vazio.textContent = "Ninguém bate com essa busca neste dia.";
    cartoes.appendChild(vazio);
  }
}

function desenharFormulario() {
  // A lista de nomes só precisa ser montada uma vez
  if (campoNome.options.length === 0) {
    TIME.forEach((pessoa) => {
      const opcao = document.createElement("option");
      opcao.value = pessoa.nome;
      opcao.textContent = pessoa.nome;
      campoNome.appendChild(opcao);
    });
  }
  formularioData.textContent = "Hoje, " + formatarData(hojeISO());
}

function desenharTudo() {
  desenharSeletorDia();
  desenharNumeros();
  desenharQuadro();
}

// ---------- Ações da pessoa ----------

// Trocar o dia
seletorDia.addEventListener("change", () => {
  diaSelecionado = seletorDia.value;
  desenharTudo();
});

// Digitar na busca
campoBusca.addEventListener("input", () => {
  textoBusca = campoBusca.value.trim().toLowerCase();
  desenharQuadro();
});

// Guardar o quadrinho
form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const pessoa = TIME.find((p) => p.nome === campoNome.value);
  const nova = {
    data: hojeISO(),
    nome: campoNome.value,
    funcao: pessoa ? pessoa.funcao : "",
    fiz_ontem: campoFizOntem.value.trim(),
    faco_hoje: campoFacoHoje.value.trim(),
    travado_em: campoTravado.value.trim(),
    placa: "",
    cidade: "",
    litros: "",
  };

  salvarResposta(nova);

  // Limpa os campos de texto e mostra o dia de hoje no quadro
  campoFizOntem.value = "";
  campoFacoHoje.value = "";
  campoTravado.value = "";
  diaSelecionado = nova.data;
  desenharTudo();

  formularioOk.hidden = false;
  setTimeout(() => (formularioOk.hidden = true), 3000);
});

// Apagar o que foi salvo neste navegador (a planilha continua igual)
botaoLimpar.addEventListener("click", () => {
  const confirmar = confirm("Apagar as respostas guardadas neste navegador? A planilha não muda.");
  if (!confirmar) return;
  localStorage.removeItem(CHAVE_LOCAL);
  escolherDiaInicial();
  desenharTudo();
});

// ---------- Começo ----------

// Mostra hoje se tiver resposta. Se não, mostra o último dia que tem.
function escolherDiaInicial() {
  const hoje = hojeISO();
  const todas = todasAsRespostas();
  const temHoje = todas.some((r) => r.data === hoje);
  if (temHoje) {
    diaSelecionado = hoje;
  } else {
    const dias = diasDisponiveis().filter((d) => d !== hoje);
    diaSelecionado = dias.length ? dias[0] : hoje;
  }
}

async function iniciar() {
  desenharFormulario();
  await carregarPlanilha();
  escolherDiaInicial();
  desenharTudo();
}

iniciar();
