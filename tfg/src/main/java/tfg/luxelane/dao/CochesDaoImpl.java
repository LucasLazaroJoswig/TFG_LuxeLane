package tfg.luxelane.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import tfg.luxelane.entidades.Coches;
import tfg.luxelane.repositorio.CochesRepository;

import java.util.List;

@Repository
public class CochesDaoImpl implements CochesDao {

    @Autowired
    private CochesRepository cochesRepository;

    @Override
    public Coches buscarPorId(Long id) {
        return cochesRepository.findById(id).orElse(null);
    }

    @Override
    public List<Coches> buscarPorMarca(String marca) {
        return cochesRepository.findByMarca(marca);
    }

    @Override
    public List<Coches> buscarPorDisponibilidad(String disponibilidad) {
        return cochesRepository.findByDisponibilidad(disponibilidad);
    }

    @Override
    public List<Coches> buscarPorTipoVehiculo(String tipoVehiculo) {
        return cochesRepository.findByTipoVehiculo(tipoVehiculo);
    }

    @Override
    public void guardar(Coches coche) {
        cochesRepository.save(coche);
    }

    @Override
    public void actualizar(Coches coche) {
        cochesRepository.save(coche); // Para actualizar simplemente guardamos, ya que JPA maneja eso internamente
    }

    @Override
    public void eliminar(Long id) {
        cochesRepository.deleteById(id);
    }
}
