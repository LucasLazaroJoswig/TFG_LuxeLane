package tfg.luxelane.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import tfg.luxelane.dao.CochesDao;
import tfg.luxelane.entidades.Coches;
import tfg.luxelane.entidades.enums.Disponibilidad;
import tfg.luxelane.repositorio.CochesRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/coches")
public class CochesRestController {

	@Autowired
	private CochesDao cocheService;
	
	@Autowired
    private CochesRepository cochesRepository;
	
	@GetMapping("/")
	public List<Coches> todosCoches() {
		return cocheService.buscarPorDisponibilidad(Disponibilidad.disponible);
	}
	
	@GetMapping("/filtrar")
    public List<Coches> obtenerCochesFiltrados(
        @RequestParam(required = false) String tipoVehiculo,
        @RequestParam(required = false) String marca,
        @RequestParam(required = false) String modelo,
        @RequestParam(required = false) String precioMax,
        @RequestParam(required = false) String tipoCombustible,
        @RequestParam(required = false) String transmision
    ) {
		Double precioMaxParse = (precioMax != null && !precioMax.trim().isEmpty()) ? Double.parseDouble(precioMax) : Double.MAX_VALUE;
		System.out.println(tipoVehiculo + marca+  modelo+ precioMax+ tipoCombustible+ transmision);
        return cochesRepository.buscarCochesFiltrados(
            tipoVehiculo, 
            marca, 
            modelo,
            precioMaxParse, 
            tipoCombustible, 
            transmision
        );
    }
	
	@GetMapping("/verDetalle/{id}")
	public Coches verDetalle(@PathVariable long id) {
		return cocheService.buscarPorId(id);
	}
	
	@GetMapping("/modelos/{marca}")
	public List<String> modelosPorMarca(@PathVariable String marca) {
		return cocheService.findModelosByMarca(marca);
	}
	
	@GetMapping("/precioMaximo")
	public Double obtenerPrecioMaximo() {
	    return cochesRepository.findMaxPrice();
	}

	@GetMapping("/marcas")
	public List<String> obtenerMarcas() {
	    return cochesRepository.findDistinctMarcas();
	}

	@GetMapping("/tiposCoche")
	public List<String> obtenerTiposCoche() {
	    return cochesRepository.findDistinctTiposVehiculo();
	}

	@GetMapping("/tiposCombustible")
	public List<String> obtenerTiposCombustible() {
	    return cochesRepository.findDistinctTiposCombustible();
	}

	@GetMapping("/tiposTransmision")
	public List<String> obtenerTiposTransmision() {
	    return cochesRepository.findDistinctTransmisiones();
	}

	
}

