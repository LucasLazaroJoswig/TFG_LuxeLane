package tfg.luxelane.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import tfg.luxelane.entidades.Motos;
import tfg.luxelane.entidades.enums.Disponibilidad;

import java.util.List;

public interface MotosRepository extends JpaRepository<Motos, Long> {

    @Query("SELECT m FROM Motos m WHERE " +
           "(?1 IS NULL OR m.tipoVehiculo = ?1) AND " +
           "(?2 IS NULL OR m.marca LIKE %?2%) AND " +
           "(?3 IS NULL OR m.modelo LIKE %?3%) AND " +
           "(m.precioPorDia >= 0) AND " + // Filtro para precio mínimo
           "(?4 IS NULL OR m.precioPorDia <= ?4) AND " + // Filtro para precio máximo
           "(?5 IS NULL OR m.tipoMotor LIKE %?5%) AND " +
           "(?6 IS NULL OR m.transmision = ?6) AND " +
           "m.disponibilidad = 'disponible'") // Filtrar motos disponibles
    List<Motos> buscarMotosFiltradas(String tipoVehiculo, String marca, String modelo, 
                                     double precioMax, 
                                     String tipoCombustible, String transmision);

    List<Motos> findByDisponibilidad(Disponibilidad disponibilidad);

    @Query("SELECT m.modelo FROM Motos m WHERE m.marca = :marca")
    List<String> findModelosByMarca(String marca);
    
    @Query("SELECT MAX(m.precioPorDia) FROM Motos m")
    Double findMaxPrice();

    @Query("SELECT DISTINCT m.marca FROM Motos m")
    List<String> findDistinctMarcas();
    
    @Query("SELECT DISTINCT m.tipoVehiculo FROM Motos m")
    List<String> findDistinctTiposVehiculo();
    
    @Query("SELECT DISTINCT m.tipoMotor FROM Motos m")
    List<String> findDistinctTiposCombustible();

    @Query("SELECT DISTINCT m.transmision FROM Motos m")
    List<String> findDistinctTransmisiones();
    
    @Query("SELECT m FROM Motos m WHERE " +
           "LOWER(CONCAT(m.marca, ' ', m.modelo)) LIKE LOWER(CONCAT('%', :palabra, '%'))")
    List<Motos> buscarPorMarcaModelo(@Param("palabra") String palabra);
}
