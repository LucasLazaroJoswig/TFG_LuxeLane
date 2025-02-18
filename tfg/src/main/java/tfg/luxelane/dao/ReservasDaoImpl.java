package tfg.luxelane.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import tfg.luxelane.entidades.Reservas;
import tfg.luxelane.repositorio.ReservasRepository;

import java.util.List;

@Service
public class ReservasDaoImpl implements ReservasDao {

    @Autowired
    private ReservasRepository reservasRepository;

    @Override
    public Reservas buscarPorId(Long id) {
        return reservasRepository.findById(id).orElse(null);
    }

    @Override
    public List<Reservas> buscarPorUsuario(Long usuarioId) {
        return reservasRepository.findByUsuarioId(usuarioId);
    }

    @Override
    public List<Reservas> buscarPorCoche(Long cocheId) {
        return reservasRepository.findByCocheId(cocheId);
    }

    @Override
    public List<Reservas> buscarPorMoto(Long motoId) {
        return reservasRepository.findByMotoId(motoId);
    }

    @Override
    public List<Reservas> buscarPorChofer(Long choferId) {
        return reservasRepository.findByChoferId(choferId);
    }

    @Override
    public List<Reservas> buscarPorEstado(String estado) {
        return reservasRepository.findByEstado(estado);
    }

    @Override
    public boolean guardar(Reservas reserva) {
        return (reservasRepository.save(reserva)!=null) ? true : false;
    }

    @Override
    public void actualizar(Reservas reserva) {
        reservasRepository.save(reserva);
    }

    @Override
    public void eliminar(Long id) {
        reservasRepository.deleteById(id);
    }
}
