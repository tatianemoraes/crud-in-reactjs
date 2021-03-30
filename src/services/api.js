export async function getUsers () {
  try {
    const response = await fetch('http://localhost:5555/users');
    const data = await response.json();
    return data;
  } catch (error) {
    alert('Ocorreu um erro ao trazer os usuários');
  }
};

export async function postUser (user) {
  try {
    await fetch('http://localhost:5555/users', {
      method:'POST',
      body: JSON.stringify(user),
      headers:{
        'Content-Type':'application/json'
      }
    });
  } catch (error) {
    alert('Ocorreu um erro ao trazer os usuários');
  }
};

export async function deleteUser(idUser) {
  try {
    await fetch(`http://localhost:5555/users/${idUser}`, {
      method: 'DELETE',
    });
  } catch (error) {
    alert('Ocorreu um erro ao deletar o usuário');
  }
}

export async function getUserById(idUser) {
  try {
    const response = await fetch(`http://localhost:5555/users/${idUser}`)
    const data = await response.json();
    return data;
  } catch (error) {
    alert('Ocorreu um erro ao tentar trazer usuário');
  }
}

export async function updateUser(idUser, data) {
  try {
    await fetch(`http://localhost:5555/users/${idUser}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
  } catch (error) {
    alert('Ocorreu um erro ao tentar atualizar o usuário');
  }
}
