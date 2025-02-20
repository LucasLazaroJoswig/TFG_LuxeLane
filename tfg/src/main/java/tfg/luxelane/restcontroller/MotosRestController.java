package tfg.luxelane.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
    private MotosDao motoService;

    @Autowired
    private MotosRepository motosRepository;

    @GetMapping("/")
    public List<Motos> obtenerMotos(){
        return motoService.buscarPorDisponibilidad(Disponibilidad.disponible);
    }

    @GetMapping("/todos")
    public List<Motos> mostrarTodas(){
        return motoService.buscarPorDisponibilidad(Disponibilidad.disponible);
    }
    
    @GetMapping("/filtrar")
    public List<Motos> obtenerMotosFiltradas(
        @RequestParam(required = false) String tipoVehiculo,
        @RequestParam(required = false) String marca,
        @RequestParam(required = false) String modelo,
        @RequestParam(required = false) String precioMax,
        @RequestParam(required = false) String tipoCombustible,
        @RequestParam(required = false) String transmision
    ) {
        Double precioMaxParse = (precioMax != null && !precioMax.trim().isEmpty()) ? Double.parseDouble(precioMax) : Double.MAX_VALUE;
        return motosRepository.buscarMotosFiltradas(
            tipoVehiculo, 
            marca, 
            modelo,
            precioMaxParse, 
            tipoCombustible, 
            transmision
        );
    }

    @GetMapping("/verDetalle/{id}")
    public Motos verDetalle(@PathVariable long id) {
        return motoService.buscarPorId(id);
    }

    @GetMapping("/modelos/{marca}")
    public List<String> modelosPorMarca(@PathVariable String marca) {
        return motosRepository.findModelosByMarca(marca);
    }

    @GetMapping("/precioMaximo")
    public Double obtenerPrecioMaximo() {
        return motosRepository.findMaxPrice();
    }

    @GetMapping("/marcas")
    public List<String> obtenerMarcas() {
        return motosRepository.findDistinctMarcas();
    }

    @GetMapping("/tiposMoto")
    public List<String> obtenerTiposMoto() {
        return motosRepository.findDistinctTiposVehiculo();
    }

    @GetMapping("/tiposCombustible")
    public List<String> obtenerTiposCombustible() {
        return motosRepository.findDistinctTiposCombustible();
    }

    @GetMapping("/tiposTransmision")
    public List<String> obtenerTiposTransmision() {
        return motosRepository.findDistinctTransmisiones();
    }
    
    @GetMapping("/buscador")
    public List<Motos> buscar(@RequestParam String palabra) {
        return motosRepository.buscarPorMarcaModelo(palabra);
    }
}