const resultado = document.querySelector('.resultado');
let input = document.querySelector('.cep');
const buscar = document.querySelector('.buscar');

function carregaElementos() {

  buscar.addEventListener('click', function () {
    var cep = input.value
    cep = cep.replace(/\D+/g, '');
    if (!cep || cep.length != 8) {
      cepInvalido();
      return
    }else{
      cepJson(cep);
    }
  });
}

async function cepJson(cep) {
  
  try {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const dados = await axios(url);
    console.log(dados);
    const json = await dados.data;
    resultado.innerHTML = `<p>CEP: ${json.cep}</p>`
    resultado.innerHTML += `<p>ESTADO: ${json.uf}</p>`
    resultado.innerHTML += `<p>CIDADE: ${json.localidade}</p>`
    resultado.innerHTML += `<p>DDD: ${json.ddd}</p>`
    input.value = ''
    return;
  } catch (e) {
    console.log(e)
    cepInvalido()
    return
  }
}

function cepInvalido() {
  input.value = ''
  resultado.innerHTML = 'Digite um cep válido';
}

carregaElementos()