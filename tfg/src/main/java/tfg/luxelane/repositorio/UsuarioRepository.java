package tfg.luxelane.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import tfg.luxelane.entidades.Usuario;
import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByCorreo(String correo);

    List<Usuario> findByRol(String rol);

    List<Usuario> findByEnabled(Boolean enabled);

}
