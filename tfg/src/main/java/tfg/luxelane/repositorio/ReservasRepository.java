package tfg.luxelane.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import tfg.luxelane.entidades.Reservas;
import java.util.List;

public interface ReservasRepository extends JpaRepository<Reservas, Long> {

    List<Reservas> findByUsuarioId(Long usuarioId);

    List<Reservas> findByCocheId(Long cocheId);

    List<Reservas> findByMotoId(Long motoId);

    List<Reservas> findByChoferId(Long choferId);

    List<Reservas> findByEstado(String estado);
}
