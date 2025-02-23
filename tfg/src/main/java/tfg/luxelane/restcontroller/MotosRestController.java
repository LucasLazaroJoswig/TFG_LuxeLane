package tfg.luxelane.restcontroller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

import tfg.luxelane.dao.MotosDao;
import tfg.luxelane.entidades.Coches;
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
        System.out.println(tipoVehiculo + marca+ modelo+ precioMax+ tipoCombustible+ transmision);

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
    
    @PutMapping("/save/{id}")
    public ResponseEntity<Map<String, Object>> actualizarMoto(@PathVariable Long id, @RequestBody Motos motoDetalles) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (motoDetalles == null) {
                response.put("error", "El cuerpo de la solicitud está vacío");
                return ResponseEntity.badRequest().body(response);
            }

            Motos motoExistente = motoService.buscarPorId(id);

            if (motoExistente != null) {
                motoExistente.setMarca(motoDetalles.getMarca());
                motoExistente.setModelo(motoDetalles.getModelo());
                motoExistente.setAño(motoDetalles.getAño());
                motoExistente.setCilindrada(motoDetalles.getCilindrada());
                motoExistente.setPotenciaHp(motoDetalles.getPotenciaHp());
                motoExistente.setTipoMotor(motoDetalles.getTipoMotor());
                motoExistente.setEtiquetaMedioambiental(motoDetalles.getEtiquetaMedioambiental());
                motoExistente.setCapacidadCombustible(motoDetalles.getCapacidadCombustible());
                motoExistente.setTransmision(motoDetalles.getTransmision());
                
                // Especificaciones propias de motos
                motoExistente.setTipoFrenoDelantero(motoDetalles.getTipoFrenoDelantero());
                motoExistente.setTipoFrenoTrasero(motoDetalles.getTipoFrenoTrasero());
                motoExistente.setTipoSuspension(motoDetalles.getTipoSuspension());
                motoExistente.setCapacidadCargaKg(motoDetalles.getCapacidadCargaKg());

                // Datos de seguridad e información adicional
                motoExistente.setAbs(motoDetalles.isAbs());
                motoExistente.setControlTraccion(motoDetalles.isControlTraccion());
                motoExistente.setEncendidoElectronico(motoDetalles.isEncendidoElectronico());
                motoExistente.setColor(motoDetalles.getColor());
                motoExistente.setKilometraje(motoDetalles.getKilometraje());
                motoExistente.setmatricula(motoDetalles.getmatricula());
                motoExistente.setTipoVehiculo(motoDetalles.getTipoVehiculo());
                motoExistente.setImagen(motoDetalles.getImagen());
                motoExistente.setPrecioPorDia(motoDetalles.getPrecioPorDia());
                motoExistente.setPrecioPorHora(motoDetalles.getPrecioPorHora());
                motoExistente.setDisponibilidad(motoDetalles.getDisponibilidad());

                System.out.println("motoExistente: " + motoExistente);
                System.out.println("motoDetalles: " + motoDetalles);

                boolean motoActualizada = motoService.actualizar(motoDetalles);

                if (motoActualizada) {
                    response.put("mensaje", "La moto ha sido actualizada correctamente");
                    response.put("moto", motoExistente);
                    return ResponseEntity.ok(response);
                } else {
                    response.put("error", "No se pudo actualizar la moto");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
                }
            } else {
                response.put("error", "Moto no encontrada");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

        } catch (Exception e) {
            response.put("error", "Error en el servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @PostMapping("/guardar")
    public ResponseEntity<Map<String, Object>> guardarMoto(@RequestBody Motos motoDetalles) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (motoDetalles == null) {
                response.put("error", "El cuerpo de la solicitud está vacío");
                return ResponseEntity.badRequest().body(response);
            }

            if (motoService.buscarPorMatricula(motoDetalles.getmatricula()) != null) {
                response.put("error", "La matrícula ya está registrada");
                return ResponseEntity.badRequest().body(response);
            }
            
            System.out.println("motoInsert: " + motoDetalles);

            boolean motoInsertada = motoService.guardar(motoDetalles);

            if (motoInsertada) {
                response.put("mensaje", "La moto ha sido insertada correctamente");
                response.put("moto", motoDetalles);
                return ResponseEntity.ok(response);
            } else {
                response.put("error", "No se pudo insertar la moto");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        } catch (Exception e) {
            response.put("error", "Error en el servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


}