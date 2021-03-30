import React, { useState, useCallback, useEffect } from 'react';
import './style.css';
import { validateCpf } from '../../Utils/mask';
import { postUser, getUserById, updateUser } from '../../services/api';
import { validateForm } from '../../Utils/validateForm';
import { useHistory } from 'react-router-dom';
// foi chamado o history para pegar o id do usuário que veio da pagina de listas
// para saber qual é o usuário que vamos chamar do banco de dados na requisição
// quando chamar o usuário vamos automaticamente jogar as informações nos inputs

function FormUser() {

  const [user, setUser] = useState({});
  const [title, setTitle] = useState('Cadastro');
  const history = useHistory();
  const { location } = history;

  useEffect(() => {
    async function fetchData() {
      if(location.state) {
        setTitle('Edição');
        const data = await getUserById(location.state.id);
        setUser(data);
      }
    }
    fetchData();
  }, [location]);

  // handle = lidar
  const handleAddUser = useCallback(async (e) => {
    e.preventDefault();
    await validateForm(user); // essa função faz a validação dos campos antes de cadastrar.
    if(location.state) {
      await updateUser(location.state.id, user);
      return history.push('/list-users');
    }
      await postUser(user);// essa função é a requisição post
      history.push('/list-users');

      return setUser({}) // limpa os campos e reseta para o começo
  },[user, history, location]);

  //cada alteração feita no estado user ele irá executar novamente o useEffect
  //se remover o user ele não irá ouvir mais o user alterado e não vai mostrar o user
  // useEffect(() => {
  //   console.log(user)
  // },[user])

  //funcao de cada input
  const handleInputChange = (event) => {

    setUser({
        ...user,
        // target.name é o name do input que é pego automaticamente
        // taget.value é o valor do input digitado e pego pelo change event

        // isso é necessário por que você está usando um objeto e cada,
        // atributo tem que ser criado com base do name do input
        [event.target.name]:event.target.value
    });
    // user : {
    //   name:'Kelvin'
    // }
  }


  return (
    <div className='form-user'>
      <form action="" className='create-user' onSubmit={handleAddUser}>
        <h1>{title} de Usuário</h1>
        <div className='forms'>
          <label className='label-form'>Nome</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={(event) => handleInputChange(event)}/>
          <label className='label-form'>Sobrenome</label>
          <input
            type="text"
            name='surname'
            value={user.surname}
            onChange={(event) => handleInputChange(event)}/>
          <label className='label-form'>Email</label>
          <input
            type="email"
            name='email'
            value={user.email}
            onChange={(event) => handleInputChange(event)}/>
          <label className='label-form'>Idade</label>
          <input
            type="number"
            name='age'
            value={user.age}
            onChange={(event) => handleInputChange(event)}/>
          <label className='label-form'>Telefone</label>
          <input
            type="text"
            name='phone'
            value={user.phone}
            onChange={(event) => handleInputChange(event)}/>
          <label className='label-form'>CPF</label>
          <input
            type="text"
            name='cpf'
            value={validateCpf(user.cpf||'')}
            onChange={(event) => handleInputChange(event)}/>
        </div>
        <div className='buttons'>
          <button type="reset" className='cancel' onClick={() =>

            location.state
            ? history.push('/list-users')
            : ''

            }>Cancelar</button>
          <button type="submit" className='confirm'>Enviar</button>
        </div>
      </form>
    </div>
  )
}

export default FormUser;
