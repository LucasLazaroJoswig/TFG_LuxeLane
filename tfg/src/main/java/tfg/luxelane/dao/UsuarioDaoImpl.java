package tfg.luxelane.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import tfg.luxelane.entidades.Usuario;
import tfg.luxelane.repositorio.UsuarioRepository;

import java.util.List;

@Repository
public class UsuarioDaoImpl implements UsuarioDao {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @Override
    public Usuario buscarPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }

    @Override
    public List<Usuario> buscarPorRol(String rol) {
        return usuarioRepository.findByRol(rol);
    }

    @Override
    public List<Usuario> buscarPorEstado(Boolean enabled) {
        return usuarioRepository.findByEnabled(enabled);
    }

    @Override
    public void guardar(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    @Override
    public void actualizar(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    @Override
    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }
}
