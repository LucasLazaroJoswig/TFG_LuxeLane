package tfg.luxelane.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.luxelane.entidades.Coches;
import tfg.luxelane.entidades.Motos;
import tfg.luxelane.repositorio.CochesRepository;
import tfg.luxelane.repositorio.MotosRepository;

@Service
public class MotosServiceImpl implements MotoService{

	@Autowired
	private MotosRepository mrepo;

	@Override
	public Motos alta(Motos moto) {
		// TODO Auto-generated method stub
		return mrepo.save(moto);
	}

	@Override
	public int modificar(Motos moto) {
		// TODO Auto-generated method stub
		if (mrepo.existsById(moto.getId())) {
			mrepo.save(moto);
			return 1;
		}
		return 0;
	}

	@Override
	public Motos buscarUno(long id) {
		// TODO Auto-generated method stub
		return mrepo.findById(id).orElse(null);
	}

	@Override
	public List<Motos> buscarTodos() {
		// TODO Auto-generated method stub
		return mrepo.findAll();
	}

	
	
	
	
}
