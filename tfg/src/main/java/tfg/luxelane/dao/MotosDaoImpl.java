package tfg.luxelane.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import tfg.luxelane.entidades.Coches;
import tfg.luxelane.entidades.Motos;
import tfg.luxelane.entidades.enums.Disponibilidad;
import tfg.luxelane.repositorio.MotosRepository;

import java.util.List;
import java.util.Optional;

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
    public Motos buscarPorMatricula(String matricula) {
        return ((Optional<Motos>) motosRepository.findByMatricula(matricula)).orElse(null);
    }

    @Override
    public List<Motos> buscarPorMarca(String marca) {
        return motosRepository.buscarPorMarcaModelo(marca);
    }

    @Override
    public List<Motos> buscarPorDisponibilidad(Disponibilidad disponibilidad) {
        return motosRepository.findByDisponibilidad(disponibilidad);
    }


    @Override
    public boolean guardar(Motos moto) {
        return (motosRepository.save(moto)!=null) ? true : false;
    }

    @Override
    public boolean actualizar(Motos moto) {
        return (motosRepository.save(moto)!=null) ? true : false;

    }

    @Override
    public void eliminar(Long id) {
        motosRepository.deleteById(id);
    }
}
