export const validateForm = async user => {

  if(!user.length > 0){
    return alert('Favor preencher todos os campos');
  }

  const { name, surname, email, age, phone, cpf } = user;

  if(!name) {
    return alert('favor preencher o nome');
  }

  if(!surname) {
    return alert('favor preencher o sobrenome');
  }

  if(!email) {
    return alert('favor preencher o email');
  }

  if(!age) {
    return alert('favor preencher a idade');
  }

  if(!phone) {
    return alert('favor preencher o telefone');
  }

  if(!cpf) {
    return alert('favor preencher o cpf');
  }

}
