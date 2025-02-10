package tfg.luxelane.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import tfg.luxelane.entidades.Resenas;
import java.util.List;

public interface ResenasRepository extends JpaRepository<Resenas, Long> {

    List<Resenas> findByUsuarioId(Long usuarioId);

    List<Resenas> findByCocheId(Long cocheId);

    List<Resenas> findByMotoId(Long motoId);

    List<Resenas> findByCalificacion(int calificacion);

}
