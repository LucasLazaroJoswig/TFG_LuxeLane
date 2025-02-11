package tfg.luxelane.service;

import java.util.List;

import tfg.luxelane.entidades.Usuario;

public interface UserService {

	int alta(Usuario user);
	int modificar(Usuario user);
	Usuario buscarUno(long id);
	List<Usuario> buscarTodos();
	Usuario login(String correo, String contrasena);
}
