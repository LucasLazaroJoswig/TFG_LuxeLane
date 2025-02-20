package tfg.luxelane.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tfg.luxelane.dao.MotosDao;
import tfg.luxelane.entidades.Motos;
import tfg.luxelane.entidades.enums.Disponibilidad;
import tfg.luxelane.repositorio.MotosRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/motos")
public class MotosRestController {

    @Autowired
    private MotosDao Motoservice;

    @Autowired
    private MotosRepository MotosRepository;

    // Endpoint para obtener Motos con paginación
    @GetMapping("/")
    public Page<Motos> obtenerMotos(
        @RequestParam(defaultValue = "1") int page,  // Número de página (default: 1)
        @RequestParam(defaultValue = "10") int limit  // Número de Motos por página (default: 10)
    ) {
        // Crear el objeto PageRequest para la paginación
        PageRequest pageRequest = PageRequest.of(page - 1, limit);  // page - 1 porque la paginación en Spring comienza desde 0

        // Devolver la lista paginada de Motos
        return MotosRepository.findAll(pageRequest);
    }

    @GetMapping("/todos")
    public List<Motos> mostrarTodos(){
    	return Motoservice.buscarPorDisponibilidad(Disponibilidad.disponible);
    }
    
    

    @GetMapping("/verDetalle/{id}")
    public Motos verDetalle(@PathVariable long id) {
        return Motoservice.buscarPorId(id);
    }

    
}
