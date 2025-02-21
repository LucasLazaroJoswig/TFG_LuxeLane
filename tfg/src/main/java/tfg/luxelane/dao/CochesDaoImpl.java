package tfg.luxelane.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import tfg.luxelane.entidades.Coches;
import tfg.luxelane.entidades.enums.Disponibilidad;
import tfg.luxelane.repositorio.CochesRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CochesDaoImpl implements CochesDao {

    @Autowired
    private CochesRepository cochesRepository;

    @Override
    public Coches buscarPorId(Long id) {
        return cochesRepository.findById(id).orElse(null);
    }

    @Override
    public Coches buscarPorMatricula(String matricula) {
        return ((Optional<Coches>) cochesRepository.findByMatricula(matricula)).orElse(null);
    }

    @Override
    public boolean guardar(Coches coche) {
        return (cochesRepository.save(coche)!=null) ? true : false;
    }

    @Override
    public boolean actualizar(Coches coche) {
        return (cochesRepository.save(coche)!=null) ? true : false;
    }

    @Override
    public void eliminar(Long id) {
        cochesRepository.deleteById(id);
    }

	@Override
	public List<Coches> buscarTodos() {
		// TODO Auto-generated method stub
		return cochesRepository.findAll();
	}



	@Override
	public List<String> findModelosByMarca(String marca) {
		// TODO Auto-generated method stub
		return cochesRepository.findModelosByMarca(marca);
	}



	@Override
	public List<Coches> buscarPorDisponibilidad(Disponibilidad disponible) {
		// TODO Auto-generated method stub
		return cochesRepository.findByDisponibilidad(disponible);
	}
}
