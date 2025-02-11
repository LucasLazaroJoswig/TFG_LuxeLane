package tfg.luxelane.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.luxelane.entidades.Coches;
import tfg.luxelane.repositorio.CochesRepository;

@Service
public class CochesServiceImpl implements CocheService{

	@Autowired
	private CochesRepository crepo;

	@Override
	public Coches alta(Coches coche) {
		// TODO Auto-generated method stub
		return crepo.save(coche);
	}

	@Override
	public int modificar(Coches coche) {
		// TODO Auto-generated method stub
		if (crepo.existsById(coche.getId())) {
			crepo.save(coche);
			return 1;
		}
		return 0;
	}

	@Override
	public Coches buscarUno(long id) {
		// TODO Auto-generated method stub
		return crepo.findById(id).orElse(null);
	}

	@Override
	public List<Coches> buscarTodos() {
		// TODO Auto-generated method stub
		return crepo.findAll();
	}
	
	
	
}
