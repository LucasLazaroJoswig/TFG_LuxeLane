package tfg.luxelane.dao;

import tfg.luxelane.entidades.Reservas;
import java.util.List;

public interface ReservasDao {

    Reservas buscarPorId(Long id);

    List<Reservas> buscarPorUsuario(Long usuarioId);

    List<Reservas> buscarPorCoche(Long cocheId);

    List<Reservas> buscarPorMoto(Long motoId);

    List<Reservas> buscarPorChofer(Long choferId);

    List<Reservas> buscarPorEstado(String estado);

    void guardar(Reservas reserva);

    void actualizar(Reservas reserva);

    void eliminar(Long id);
}
