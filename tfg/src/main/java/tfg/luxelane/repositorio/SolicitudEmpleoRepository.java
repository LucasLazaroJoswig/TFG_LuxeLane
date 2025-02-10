package tfg.luxelane.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tfg.luxelane.entidades.SolicitudEmpleo;
import tfg.luxelane.entidades.Usuario;
import tfg.luxelane.entidades.enums.EstadoVerificacion;

import java.util.List;

@Repository
public interface SolicitudEmpleoRepository extends JpaRepository<SolicitudEmpleo, Long> {
    List<SolicitudEmpleo> findByEstado(EstadoVerificacion estado);
    List<SolicitudEmpleo> findByUsuario(Usuario usuario);
}
