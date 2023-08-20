var nome = window.document.querySelector("input#nome");
var cpf = document.querySelector("input#cpf");
var txtv = window.document.querySelector("input#txtvel");
var res = window.document.querySelector("div#res");
var erroNome = document.querySelector("#erro-nome");
var erroCpf = document.querySelector("#erro-cpf");
var erroTxtv = document.querySelector("#erro-txtv");

nome.addEventListener("keypress", () => {
  erroNome.innerHTML = "";
});
cpf.addEventListener("keypress", () => {
  erroCpf.innerHTML = "";
});
txtv.addEventListener("keypress", () => {
  erroTxtv.innerHTML = "";
});

function calcular() {
  if (!nome.value) {
    erroNome.innerHTML = "Campo obrigatório!";
  }
  if (!cpf.value) {
    erroCpf.innerHTML = "Campo obrigatório!";
  }
  if (!validarCPF(cpf.value)) {
    erroCpf.innerHTML = "CPF inválido!";
  }
  if (!txtv.value) {
    erroTxtv.innerHTML = "Campo obrigatório!";
  }
  if (!nome.value || !cpf.value || !txtv.value || !validarCPF(cpf.value)) {
    res.innerHTML = "";
    return;
  }

  var vel = Number(txtv.value);
  res.innerHTML = `<p>Sua velocidade atual é de <strong>${vel}</strong> Km/h.</p>`;
  if (vel > 60) {
    res.innerHTML += `<p>Olá, ${nome.value}! Você está <strong>MULTADO</strong> por excesso de velocidade! <br> Iremos consultar seu CPF: ${cpf.value}</p>`;
    res.style.color = "red";
  } else {
    res.innerHTML += `<p>Olá, ${nome.value}! Dirija sempre com cinto de segurança! <br> Seu CPF: ${cpf.value} <strong>- SEU NOME ESTÁ LIMPO</strong></p>`;
    res.style.color = "green";
  }
}
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let primeiroDigito = 11 - (soma % 11);
  if (primeiroDigito > 9) {
    primeiroDigito = 0;
  }

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let segundoDigito = 11 - (soma % 11);
  if (segundoDigito > 9) {
    segundoDigito = 0;
  }

  // Verifica se os dígitos calculados coincidem com os dígitos informados
  if (
    parseInt(cpf.charAt(9)) !== primeiroDigito ||
    parseInt(cpf.charAt(10)) !== segundoDigito
  ) {
    return false;
  }

  return true;
}
