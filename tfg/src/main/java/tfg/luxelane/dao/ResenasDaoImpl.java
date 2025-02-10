package tfg.luxelane.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import tfg.luxelane.entidades.Resenas;
import tfg.luxelane.repositorio.ResenasRepository;

import java.util.List;

@Repository
public class ResenasDaoImpl implements ResenasDao {

    @Autowired
    private ResenasRepository resenasRepository;

    @Override
    public Resenas buscarPorId(Long id) {
        return resenasRepository.findById(id).orElse(null);
    }

    @Override
    public List<Resenas> buscarPorUsuario(Long usuarioId) {
        return resenasRepository.findByUsuarioId(usuarioId);
    }

    @Override
    public List<Resenas> buscarPorCoche(Long cocheId) {
        return resenasRepository.findByCocheId(cocheId);
    }

    @Override
    public List<Resenas> buscarPorMoto(Long motoId) {
        return resenasRepository.findByMotoId(motoId);
    }

    @Override
    public List<Resenas> buscarPorCalificacion(int calificacion) {
        return resenasRepository.findByCalificacion(calificacion);
    }

    @Override
    public void guardar(Resenas resena) {
        resenasRepository.save(resena);
    }

    @Override
    public void actualizar(Resenas resena) {
        resenasRepository.save(resena);
    }

    @Override
    public void eliminar(Long id) {
        resenasRepository.deleteById(id);
    }
}
