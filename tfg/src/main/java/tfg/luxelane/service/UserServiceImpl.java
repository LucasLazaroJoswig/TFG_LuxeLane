package tfg.luxelane.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import tfg.luxelane.entidades.Usuario;
import tfg.luxelane.repositorio.UsuarioRepository;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UsuarioRepository urepo;

	@Override
	public int alta(Usuario user) {
		// TODO Auto-generated method stub
		return (urepo.save(user) != null) ? 1 : 0;
	}

	@Override
	public int modificar(Usuario user) {
		// TODO Auto-generated method stub
		if (urepo.existsById(user.getId())) {
			urepo.save(user);
			return 1;
		}
		return 0;
	}

	@Override
	public Usuario buscarUno(long id) {
		// TODO Auto-generated method stub
		return urepo.findById(id).orElse(null);
	}

	@Override
	public List<Usuario> buscarTodos() {
		// TODO Auto-generated method stub
		return urepo.findAll();
	}

	@Override
	public Usuario login(String correo, String contrasena) {
	    	    
	    return urepo.login(correo, contrasena);
	}
	
}
