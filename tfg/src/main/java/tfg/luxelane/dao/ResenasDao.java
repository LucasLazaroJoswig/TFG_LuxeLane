package tfg.luxelane.dao;

import tfg.luxelane.entidades.Resenas;
import java.util.List;

public interface ResenasDao {

    Resenas buscarPorId(Long id);

    List<Resenas> buscarPorUsuario(Long usuarioId);

    List<Resenas> buscarPorCoche(Long cocheId);

    List<Resenas> buscarPorMoto(Long motoId);

    List<Resenas> buscarPorCalificacion(int calificacion);

    void guardar(Resenas resena);

    void actualizar(Resenas resena);

    void eliminar(Long id);
}
