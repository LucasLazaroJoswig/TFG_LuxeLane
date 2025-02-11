package tfg.luxelane.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import tfg.luxelane.entidades.SolicitudEmpleo;
import java.util.List;

public interface SolicitudEmpleoRepository extends JpaRepository<SolicitudEmpleo, Long> {

    List<SolicitudEmpleo> findByUsuarioId(Long usuarioId);

    List<SolicitudEmpleo> findByEstado(String estado);

}
