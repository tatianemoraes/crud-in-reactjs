import React, { useState, useEffect, useCallback } from 'react';
import './style.css';
import { getUsers, deleteUser } from '../../services/api';
import { useHistory } from 'react-router-dom';
// chamamos o useHisotry para fazer o evento href no botao passando propriedade o id do user

function Table() {

  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    //vc deve pegar os dados da api e quando a pagina carregar vc vai dar um setUsers com dados para salvar no estado criado chamado users
    async function getUsersFetch () { // desta maneira foi sugerida pelo eslint
      const data = await getUsers();
      setUsers(data);
    }
    getUsersFetch()
  },[]);

  const deleteUserSelected = useCallback( async (userId) => {

    await deleteUser(userId);
    //filter um array method, que basicamente o funcionamento dele é reconstruir o array com base
    // na logica que vc definir dentro dele
    // para este caso ele vai reconstruir o array somente com os usuarios que nao terem o mesmo userId
    setUsers(users.filter(user => user.id !== userId))
  },[users]);

  return (
  <div className='table-main'>
    <table>
      <thead>
        <tr>
          <th>NOME</th>
          <th>SOBRENOME</th>
          <th>EMAIL</th>
          <th>IDADE</th>
          <th>TELEFONE</th>
          <th>CPF</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.phone}</td>
                <td>{user.cpf}</td>
                <td>
                  <div>
                    <button
                    type='button'
                    onClick={() => history.push(`/edit/${user.id}`, { id: user.id } )}>EDITAR</button>
                  </div>
                  <div>
                    <button type='button' onClick={() => deleteUserSelected(user.id)}>EXCLUIR</button>
                  </div>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  </div>);
}

export default Table;
