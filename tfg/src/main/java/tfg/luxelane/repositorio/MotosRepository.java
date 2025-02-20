package tfg.luxelane.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tfg.luxelane.entidades.Motos;
import tfg.luxelane.entidades.enums.Disponibilidad;


public interface MotosRepository extends JpaRepository<Motos, Long> {

    List<Motos> findByMarca(String marca);

    List<Motos> findByDisponibilidad(Disponibilidad disponibilidad);

    List<Motos> findByTipoVehiculo(String tipoVehiculo);


}
