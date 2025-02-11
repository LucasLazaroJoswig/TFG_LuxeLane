package tfg.luxelane.service;

import java.util.List;

import tfg.luxelane.entidades.Coches;

public interface CocheService {

	Coches alta(Coches coche);
	int modificar(Coches coche);
	Coches buscarUno(long id);
	List<Coches> buscarTodos();
}
