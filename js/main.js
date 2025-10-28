// main.js — melhorias: validação de CPF (algoritmo), preenchimento CEP via ViaCEP, máscaras melhoradas

document.addEventListener('DOMContentLoaded', function(){
  // Nav toggle
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', function(){
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('open');
    });
  }

  // Conditional volunteer fields
  var tipo = document.getElementById('tipo');
  var volunteer = document.getElementById('volunteer');
  if(tipo && volunteer){
    tipo.addEventListener('change', function(){
      volunteer.hidden = this.value !== 'voluntario';
    });
  }

  // Masks
  function setInputFilter(el, fn){
    el.addEventListener('input', function(){
      var old = this.value;
      this.value = fn(this.value);
    });
  }

  var cpf = document.getElementById('cpf');
  var tel = document.getElementById('telefone');
  var cep = document.getElementById('cep');

  function maskCPF(v){
    return v.replace(/\D/g,'')
            .replace(/(\d{3})(\d)/,'$1.$2')
            .replace(/(\d{3})(\d)/,'$1.$2')
            .replace(/(\d{3})(\d{1,2})$/,'$1-$2')
            .slice(0,14);
  }
  function maskTel(v){
    v = v.replace(/\D/g,'');
    if(v.length <= 10){
      return v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3').trim().slice(0,14);
    } else {
      return v.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3').slice(0,15);
    }
  }
  function maskCEP(v){
    return v.replace(/\D/g,'').replace(/(\d{5})(\d)/,'$1-$2').slice(0,9);
  }

  if(cpf) setInputFilter(cpf, maskCPF);
  if(tel) setInputFilter(tel, maskTel);
  if(cep) setInputFilter(cep, maskCEP);

  // CPF validator (retorna true se válido)
  function validateCPF(str){
    if(!str) return false;
    var s = str.replace(/\D/g,'');
    if(s.length !== 11) return false;
    if(/^(\d)\1{10}$/.test(s)) return false;
    function calcDigit(slice){
      var sum = 0;
      for(var i=0;i<slice.length;i++){
        sum += parseInt(slice.charAt(i)) * (slice.length+1 - i);
      }
      var res = (sum * 10) % 11;
      return res === 10 ? 0 : res;
    }
    var d1 = calcDigit(s.slice(0,9));
    var d2 = calcDigit(s.slice(0,9) + d1);
    return d1 === parseInt(s.charAt(9)) && d2 === parseInt(s.charAt(10));
  }

  // CEP auto-fill via ViaCEP (client-side). Nota: depende de CORS do serviço; funciona normalmente.
  if(cep){
    cep.addEventListener('blur', function(){
      var clean = this.value.replace(/\D/g,'');
      if(clean.length === 8){
        var url = 'https://viacep.com.br/ws/' + clean + '/json/';
        fetch(url).then(function(resp){
          if(!resp.ok) throw new Error('Falha ao consultar CEP');
          return resp.json();
        }).then(function(data){
          if(data.erro){
            alert('CEP não encontrado.');
            return;
          }
          var endereco = document.getElementById('endereco');
          var cidade = document.getElementById('cidade');
          var estado = document.getElementById('estado');
          if(endereco) endereco.value = data.logradouro || endereco.value;
          if(cidade) cidade.value = data.localidade || cidade.value;
          if(estado) estado.value = data.uf || estado.value;
        }).catch(function(err){
          console.warn('CEP fetch error', err);
        });
      }
    });
  }

  // Form submission + CPF check
  var form = document.getElementById('formCadastro');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      // native validity
      if(!form.checkValidity()){
        var firstInvalid = form.querySelector(':invalid');
        if(firstInvalid) firstInvalid.focus();
        alert('Por favor, corrija os campos obrigatórios.');
        return;
      }
      // CPF check
      if(cpf && !validateCPF(cpf.value)){
        cpf.focus();
        alert('CPF inválido. Verifique e tente novamente.');
        return;
      }
      // Simulação de envio (no projeto final, trocar por fetch para backend)
      var payload = Object.fromEntries(new FormData(form));
      console.log('Cadastro (simulação):', payload);
      alert('Cadastro enviado com sucesso (simulado).');
      form.reset();
    });
  }

});
