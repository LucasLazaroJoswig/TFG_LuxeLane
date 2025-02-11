package tfg.luxelane.dao;

import tfg.luxelane.entidades.Motos;
import java.util.List;

public interface MotosDao {

    Motos buscarPorId(Long id);

    List<Motos> buscarPorMarca(String marca);

    List<Motos> buscarPorDisponibilidad(String disponibilidad);

    List<Motos> buscarPorTipoVehiculo(String tipoVehiculo);

    void guardar(Motos moto);

    void actualizar(Motos moto);

    void eliminar(Long id);
}
