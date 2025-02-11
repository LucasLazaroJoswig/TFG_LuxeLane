package tfg.luxelane.dao;

import tfg.luxelane.entidades.SolicitudEmpleo;
import java.util.List;

public interface SolicitudEmpleoDao {

    SolicitudEmpleo buscarPorId(Long id);

    List<SolicitudEmpleo> buscarPorUsuario(Long usuarioId);

    List<SolicitudEmpleo> buscarPorEstado(String estado);

    void guardar(SolicitudEmpleo solicitudEmpleo);

    void actualizar(SolicitudEmpleo solicitudEmpleo);

    void eliminar(Long id);
}
