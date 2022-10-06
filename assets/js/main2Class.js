const resultado = document.querySelector('.resultado');
const input = document.querySelector('.cep');

class Buscador {
  constructor() {
    this.buscar = document.querySelector('.buscar');
    this.carregaElementos();
  }

  carregaElementos() {
    this.buscar.addEventListener('click', function () {
      let cep = input.value
      cep = cep.replace(/\D+/g, '');
      console.log(cep);
      if (!cep || cep.length != 8) {
        input.value = ''
        resultado.innerHTML = 'Digite um cep válido';
        return
      } else {
        cepJson(cep, this.resultado);
      }
    });
  }

}

async function cepJson(cep) {

  try {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const dados = await axios(url);
    const json = await dados.data;
    resultado.innerHTML = `<p>CEP: ${json.cep}</p>`
    resultado.innerHTML += `<p>ESTADO: ${json.uf}</p>`
    resultado.innerHTML += `<p>CIDADE: ${json.localidade}</p>`
    resultado.innerHTML += `<p>DDD: ${json.ddd}</p>`
    input.value = ''
    return;
  } catch (e) {
    console.error('Error: ' + e)
    input.value = ''
    resultado.innerHTML = 'Digite um cep válido';
    return
  }
}

const buscador = new Buscador();