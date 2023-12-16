class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      throw new Error(error);
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});
formSubmit.init();
function clickMenu() {
  // Recupera a referência para o elemento com o id "itens"
  var itens = document.getElementById('itens');

  if (itens.style.display == 'block') {
    itens.style.display = 'none';
  } else {
    itens.style.display = 'block';
  }
}

// Função para verificar se o usuário está logado e se tem permissão para acessar uma determinada página
function isUsuarioAutorizado(paginaAlvo) {
  // Recupera os dados do localStorage
  var storedUsuario = localStorage.getItem('usuario');

  // Verifica se o usuário está logado
  if (storedUsuario !== null) {
    // Converte a string JSON armazenada de volta para um objeto
    var usuario = JSON.parse(storedUsuario);

    // Adicione aqui a lógica para verificar se o usuário tem permissão para acessar a página alvo
    // Neste exemplo, vamos permitir o acesso a todas as páginas se o usuário estiver logado
    return true;
  } else {
    // Se o usuário não está logado, não tem permissão
    return false;
  }
}

// Exemplo de uso
var paginaAlvo = "roteiros.html"; // Substitua isso pelo nome da página que você deseja verificar
if (isUsuarioAutorizado(paginaAlvo)) {
  console.log('O usuário está autorizado a acessar ' + paginaAlvo);
  // Adicione aqui o código para redirecionar para a página alvo ou qualquer outra ação
} else {
  console.log('O usuário não está autorizado a acessar ' + paginaAlvo);
  // Adicione aqui o código para redirecionar para uma página de login ou outra ação
}

// Função para ocultar o item de Roteiros se o usuário não estiver logado
function ocultarRoteirosSeNaoLogado() {
  var roteirosItem = document.getElementById('roteirosItem');
  if (isUsuarioLogado()) {
      roteirosItem.style.display = 'none';
  } else {
      roteirosItem.style.display = 'block';
  }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', ocultarRoteirosSeNaoLogado);

