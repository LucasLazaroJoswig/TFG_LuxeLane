package tfg.luxelane.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tfg.luxelane.entidades.Motos;


public interface MotosRepository extends JpaRepository<Motos, Long> {

    List<Motos> findByMarca(String marca);

    List<Motos> findByDisponibilidad(String disponibilidad);

    List<Motos> findByTipoVehiculo(String tipoVehiculo);


}
