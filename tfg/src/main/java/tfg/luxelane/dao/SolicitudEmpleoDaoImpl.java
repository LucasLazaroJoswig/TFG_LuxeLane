package tfg.luxelane.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import tfg.luxelane.entidades.SolicitudEmpleo;
import tfg.luxelane.repositorio.SolicitudEmpleoRepository;

import java.util.List;

@Service
public class SolicitudEmpleoDaoImpl implements SolicitudEmpleoDao {

    @Autowired
    private SolicitudEmpleoRepository solicitudEmpleoRepository;

    @Override
    public SolicitudEmpleo buscarPorId(Long id) {
        return solicitudEmpleoRepository.findById(id).orElse(null);
    }

    @Override
    public List<SolicitudEmpleo> buscarPorUsuario(Long usuarioId) {
        return solicitudEmpleoRepository.findByUsuarioId(usuarioId);
    }

    @Override
    public List<SolicitudEmpleo> buscarPorEstado(String estado) {
        return solicitudEmpleoRepository.findByEstado(estado);
    }

    @Override
    public void guardar(SolicitudEmpleo solicitudEmpleo) {
        solicitudEmpleoRepository.save(solicitudEmpleo);
    }

    @Override
    public void actualizar(SolicitudEmpleo solicitudEmpleo) {
        solicitudEmpleoRepository.save(solicitudEmpleo);
    }

    @Override
    public void eliminar(Long id) {
        solicitudEmpleoRepository.deleteById(id);
    }
}
