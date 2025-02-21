package tfg.luxelane.dao;

import tfg.luxelane.entidades.Coches;
import tfg.luxelane.entidades.enums.Disponibilidad;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

public interface CochesDao {

	List<Coches> buscarTodos();
	
    Coches buscarPorId(Long id);
    
    Coches buscarPorMatricula(String matricula);

    List<Coches> buscarPorDisponibilidad(Disponibilidad disponible);

    List<String> findModelosByMarca(String marca);

    boolean guardar(Coches coche);

    boolean actualizar(Coches coche);

    void eliminar(Long id);
}
