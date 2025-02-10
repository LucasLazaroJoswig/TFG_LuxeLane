package tfg.luxelane.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import tfg.luxelane.entidades.Motos;
import tfg.luxelane.repositorio.MotosRepository;

import java.util.List;

@Repository
public class MotosDaoImpl implements MotosDao {

    @Autowired
    private MotosRepository motosRepository;

    @Override
    public Motos buscarPorId(Long id) {
        return motosRepository.findById(id).orElse(null);
    }

    @Override
    public List<Motos> buscarPorMarca(String marca) {
        return motosRepository.findByMarca(marca);
    }

    @Override
    public List<Motos> buscarPorDisponibilidad(String disponibilidad) {
        return motosRepository.findByDisponibilidad(disponibilidad);
    }

    @Override
    public List<Motos> buscarPorTipoVehiculo(String tipoVehiculo) {
        return motosRepository.findByTipoVehiculo(tipoVehiculo);
    }

    @Override
    public void guardar(Motos moto) {
        motosRepository.save(moto);
    }

    @Override
    public void actualizar(Motos moto) {
        motosRepository.save(moto);
    }

    @Override
    public void eliminar(Long id) {
        motosRepository.deleteById(id);
    }
}
