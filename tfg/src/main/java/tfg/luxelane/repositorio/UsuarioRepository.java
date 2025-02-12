package tfg.luxelane.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import tfg.luxelane.entidades.Usuario;

import tfg.luxelane.entidades.Usuario;
import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	
	@Query("SELECT u FROM Usuario u WHERE u.correo = ?1")
    Usuario findByCorreo(String correo);
    
	@Query("SELECT u FROM Usuario u WHERE u.correo = ?1 AND u.password = ?2 AND u.enabled = 'S'")
	Usuario login(String correo, String contrasena);
	
    List<Usuario> findByRol(String rol);

    List<Usuario> findByEnabled(String enabled);


}
