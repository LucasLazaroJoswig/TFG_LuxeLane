package tfg.luxelane.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import tfg.luxelane.entidades.Motos;
import tfg.luxelane.entidades.enums.Disponibilidad;
import tfg.luxelane.repositorio.MotosRepository;

import java.util.List;

@Service
public class MotosDaoImpl implements MotosDao {

    @Autowired
    private MotosRepository motosRepository;

    @Override
    public Motos buscarPorId(Long id) {
        return motosRepository.findById(id).orElse(null);
    }
    @Override
	public List<Motos> buscarTodos() {
		// TODO Auto-generated method stub
		return motosRepository.findAll();
	}

    @Override
    public List<Motos> buscarPorMarca(String marca) {
        return motosRepository.findByMarca(marca);
    }

    @Override
    public List<Motos> buscarPorDisponibilidad(Disponibilidad disponibilidad) {
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
