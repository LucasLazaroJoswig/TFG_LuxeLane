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
            "(c.precioPorDia >= 0) AND " + // Filtro para precio mínimo
            "(?4 IS NULL OR c.precioPorDia <= ?4) AND " + // Filtro para precio máximo
            "(?5 IS NULL OR c.tipoMotor LIKE %?5%) AND " +
            "(?6 IS NULL OR c.transmision = ?6)")
    List<Coches> buscarCochesFiltrados(String tipoVehiculo, String marca, String modelo, 
                                      double precioMax, 
                                      String tipoCombustible, String transmision);
	

    List<Coches> findByDisponibilidad(Disponibilidad disponibilidad);

    
    @Query("SELECT c.modelo FROM Coches c WHERE c.marca = :marca")
    List<String> findModelosByMarca(String marca);
    
    @Query("SELECT MAX(c.precioPorDia) FROM Coches c")
    Double findMaxPrice();

    @Query("SELECT DISTINCT c.marca FROM Coches c")
    List<String> findDistinctMarcas();
    
    @Query("SELECT DISTINCT c.tipoVehiculo FROM Coches c")
    List<String> findDistinctTiposVehiculo();
    
    @Query("SELECT DISTINCT c.tipoMotor FROM Coches c")
    List<String> findDistinctTiposCombustible();

    @Query("SELECT DISTINCT c.transmision FROM Coches c")
    List<String> findDistinctTransmisiones();



}




