package tfg.luxelane.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import tfg.luxelane.entidades.Usuario;


public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

	@Query("SELECT u FROM Usuario u WHERE u.correo = ?1 AND u.password = ?2 AND u.enabled = 'S'")
	Usuario login(String correo, String contrasena);

}
