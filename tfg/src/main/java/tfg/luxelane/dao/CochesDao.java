package tfg.luxelane.dao;

import tfg.luxelane.entidades.Coches;
import tfg.luxelane.entidades.enums.Disponibilidad;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

public interface CochesDao {

	List<Coches> buscarTodos();
	
    Coches buscarPorId(Long id);


    List<Coches> buscarPorDisponibilidad(Disponibilidad disponible);

    List<String> findModelosByMarca(String marca);

    void guardar(Coches coche);

    void actualizar(Coches coche);

    void eliminar(Long id);
}
