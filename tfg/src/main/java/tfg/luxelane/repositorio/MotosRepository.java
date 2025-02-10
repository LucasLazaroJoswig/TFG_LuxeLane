package tfg.luxelane.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import tfg.luxelane.entidades.Motos;
import java.util.List;

public interface MotosRepository extends JpaRepository<Motos, Long> {

    List<Motos> findByMarca(String marca);

    List<Motos> findByDisponibilidad(String disponibilidad);

    List<Motos> findByTipoVehiculo(String tipoVehiculo);

}
