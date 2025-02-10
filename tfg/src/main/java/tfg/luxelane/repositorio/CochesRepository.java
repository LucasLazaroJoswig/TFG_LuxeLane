package tfg.luxelane.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import tfg.luxelane.entidades.Coches;
import java.util.List;

public interface CochesRepository extends JpaRepository<Coches, Long> {

    List<Coches> findByMarca(String marca);

    List<Coches> findByDisponibilidad(String disponibilidad);

    List<Coches> findByTipoVehiculo(String tipoVehiculo);

}
