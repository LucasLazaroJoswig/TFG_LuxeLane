package tfg.luxelane.dao;

import tfg.luxelane.entidades.Usuario;
import java.util.List;

public interface UsuarioDao {

    Usuario buscarPorId(Long id);

    Usuario buscarPorCorreo(String correo);

    List<Usuario> buscarPorRol(String rol);

    List<Usuario> buscarPorEstado(Boolean enabled);

    void guardar(Usuario usuario);

    void actualizar(Usuario usuario);

    void eliminar(Long id);
}
