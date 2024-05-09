async function buscarEndereco(cep) {

  let mensagemErro = document.querySelector('#erro');
  mensagemErro.innerHTML = '';

  try {
    let consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let consultaCepConvertida = await consultaCep.json();

    if (consultaCepConvertida.erro) {
      throw Error('CEP não existe!');
    }

    let cidade = document.querySelector('#cidade');
    let endereco = document.querySelector('#endereco');
    let estado = document.querySelector('#estado');
    let bairro = document.querySelector('#bairro');

    cidade.value = consultaCepConvertida.localidade;
    endereco.value = consultaCepConvertida.logradouro;
    estado.value = consultaCepConvertida.uf;
    bairro.value = consultaCepConvertida.bairro;

    return consultaCepConvertida;

  } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`;
  }
}

let cep = document.querySelector('#cep');
cep.addEventListener('focusout', () => buscarEndereco(cep.value));