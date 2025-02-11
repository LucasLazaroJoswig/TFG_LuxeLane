package tfg.luxelane.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import tfg.luxelane.entidades.Coches;
import java.util.List;

public interface CochesRepository extends JpaRepository<Coches, Long> {

    List<Coches> findByMarca(String marca);

    List<Coches> findByDisponibilidad(String disponibilidad);

    List<Coches> findByTipoVehiculo(String tipoVehiculo);
=======

import tfg.luxelane.entidades.Coches;


public interface CochesRepository extends JpaRepository<Coches, Long>{
>>>>>>> ea3049a3b41b648e3a778bb73c312c8df604f547

}
