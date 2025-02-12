package tfg.luxelane.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import tfg.luxelane.entidades.Coches;
import tfg.luxelane.entidades.enums.Disponibilidad;

import java.util.List;

public interface CochesRepository extends JpaRepository<Coches, Long> {

    @Query("SELECT c FROM Coches c WHERE " +
            "(?1 IS NULL OR c.tipoVehiculo = ?1) AND " +
            "(?2 IS NULL OR c.marca LIKE %?2%) AND " +
            "(?3 IS NULL OR c.modelo LIKE %?3%) AND " +
            "(?4 IS NULL OR c.precioPorDia >= ?4) AND " + // Filtro para precio mínimo
            "(?5 IS NULL OR c.precioPorDia <= ?5) AND " + // Filtro para precio máximo
            "(?6 IS NULL OR c.tipoMotor LIKE %?6%) AND " +
            "(?7 IS NULL OR c.transmision = ?7)")
    List<Coches> buscarCochesFiltrados(String tipoVehiculo, String marca, String modelo, 
                                      double precioMin, double precioMax, 
                                      String tipoCombustible, String transmision);
	
    List<Coches> findByMarca(String marca);

    List<Coches> findByDisponibilidad(Disponibilidad disponibilidad);

    List<Coches> findByTipoVehiculo(String tipoVehiculo);

}


