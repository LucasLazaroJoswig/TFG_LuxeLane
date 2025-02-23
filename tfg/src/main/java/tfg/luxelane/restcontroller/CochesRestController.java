package tfg.luxelane.restcontroller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    // Endpoint para obtener coches con paginación
    @GetMapping("/")
    public List<Coches> obtenerCoches(){
    		return cocheService.buscarPorDisponibilidad(Disponibilidad.disponible);
    }
    @GetMapping("/todos")
    public List<Coches> obtenerTodosCoches(){
    		return cocheService.buscarTodos();
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
        System.out.println(tipoVehiculo + marca+ modelo+ precioMax+ tipoCombustible+ transmision);
        return cochesRepository.buscarCochesFiltrados(
            tipoVehiculo, 
            marca, 
            modelo,
            precioMaxParse, 
            tipoCombustible, 
            transmision
        );
    }
    @PutMapping("/save/{id}")
    public ResponseEntity<Map<String, Object>> actualizarCoche(@PathVariable Long id, @RequestBody Coches cocheDetalles) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (cocheDetalles == null) {
                response.put("error", "El cuerpo de la solicitud está vacío");
                return ResponseEntity.badRequest().body(response);
            }

            Coches cocheExistente = cocheService.buscarPorId(id);

            if (cocheExistente != null) {
                cocheExistente.setMarca(cocheDetalles.getMarca());
                cocheExistente.setModelo(cocheDetalles.getModelo());
                cocheExistente.setAño(cocheDetalles.getAño());
                cocheExistente.setCilindrada(cocheDetalles.getCilindrada());
                cocheExistente.setPotenciaHp(cocheDetalles.getPotenciaHp());
                cocheExistente.setTipoMotor(cocheDetalles.getTipoMotor());
                cocheExistente.setEtiquetaMedioambiental(cocheDetalles.getEtiquetaMedioambiental());
                cocheExistente.setCapacidadCombustible(cocheDetalles.getCapacidadCombustible());
                cocheExistente.setTransmision(cocheDetalles.getTransmision());
                cocheExistente.setNumeroPuertas(cocheDetalles.getNumeroPuertas());
                cocheExistente.setNumeroAsientos(cocheDetalles.getNumeroAsientos());
                cocheExistente.setColor(cocheDetalles.getColor());
                cocheExistente.setAirbags(cocheDetalles.getAirbags());
                cocheExistente.setAbs(cocheDetalles.isAbs());
                cocheExistente.setSensoresEstacionamiento(cocheDetalles.isSensoresEstacionamiento());
                cocheExistente.setGps(cocheDetalles.isGps());
                cocheExistente.setBluetooth(cocheDetalles.isBluetooth());
                cocheExistente.setAireAcondicionado(cocheDetalles.isAireAcondicionado());
                cocheExistente.setCamaraReversa(cocheDetalles.isCamaraReversa());

                cocheExistente.setControlTraccion(cocheDetalles.isControlTraccion());
                cocheExistente.setAsistenteFrenado(cocheDetalles.isAsistenteFrenado());
                cocheExistente.setKilometraje(cocheDetalles.getKilometraje());
                cocheExistente.setMatricula(cocheDetalles.getMatricula());
                cocheExistente.setTipoVehiculo(cocheDetalles.getTipoVehiculo());
                cocheExistente.setImagen(cocheDetalles.getImagen());
                cocheExistente.setPrecioPorDia(cocheDetalles.getPrecioPorDia());
                cocheExistente.setPrecioPorHora(cocheDetalles.getPrecioPorHora());
                cocheExistente.setDisponibilidad(cocheDetalles.getDisponibilidad());
                System.out.println("cocheExistenten"+cocheExistente);
                System.out.println("cocheDetalles"+cocheDetalles);

                boolean cocheActualizado = cocheService.actualizar(cocheExistente);

                if (cocheActualizado) {
                    response.put("mensaje", "El coche ha sido actualizado correctamente");
                    response.put("coche", cocheExistente);
                    return ResponseEntity.ok(response);
                } else {
                    response.put("error", "No se pudo actualizar el coche");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
                }
            } else {
            	
                response.put("error", "Coche no encontrado");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

        } catch (Exception e) {
            response.put("error", "Error en el servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @PostMapping("/guardar")
    public ResponseEntity<Map<String, Object>> guardarCoche(@RequestBody Coches cocheDetalles) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (cocheDetalles == null) {
                response.put("error", "El cuerpo de la solicitud está vacío");
                return ResponseEntity.badRequest().body(response);
            }

            if (cocheService.buscarPorMatricula(cocheDetalles.getMatricula())!=null) {
            	response.put("error", "la matricula ya esta registrada");
                return ResponseEntity.badRequest().body(response);
            }
                System.out.println("cocheinsert"+cocheDetalles);

                boolean cocheInsertado = cocheService.guardar(cocheDetalles);

                if (cocheInsertado) {
                    response.put("mensaje", "El coche ha sido insertado correctamente");
                    response.put("coche", cocheDetalles);
                    return ResponseEntity.ok(response);
                } else {
                    response.put("error", "No se pudo insertar el coche");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
                }
        } catch (Exception e) {
            response.put("error", "Error en el servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
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

    @GetMapping("/buscador")
    public List<Coches> buscar(@RequestParam String palabra) {
        return cochesRepository.buscarPorMarcaModelo(palabra);
    }
}

