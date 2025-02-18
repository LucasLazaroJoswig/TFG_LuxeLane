package tfg.luxelane.restcontroller;

import java.util.Date;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import tfg.luxelane.dao.CochesDao;
import tfg.luxelane.dao.MotosDao;
import tfg.luxelane.dao.ReservasDao;
import tfg.luxelane.dao.UsuarioDao;
import tfg.luxelane.entidades.Coches;
import tfg.luxelane.entidades.Motos;
import tfg.luxelane.entidades.Reservas;
import tfg.luxelane.entidades.Usuario;
import tfg.luxelane.entidades.enums.EstadoReserva;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/reservas")
public class ReservasController {

    @Autowired
    private ReservasDao reservaService;

    @Autowired
    private CochesDao cocheService;

    @Autowired
    private MotosDao motoService;

    @Autowired
    private UsuarioDao usuarioService;

    private final Path fileStorageLocation = Paths.get("../front/assets/uploads").normalize();

    @PostMapping("/crear")
    public ResponseEntity<?> hacerReserva(
            @RequestParam Long usuario_id,
            @RequestParam String tipo_vehiculo,
            @RequestParam Long vehiculo_id,
            @RequestParam String fecha_inicio,
            @RequestParam String fecha_fin,
            @RequestParam String direccion,
            @RequestParam MultipartFile documentacion,
            @RequestParam String tipoCarnet
    ) throws ParseException {

        SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd");

        Date fechaInicio = formato.parse(fecha_inicio);
        Date fechaFin = formato.parse(fecha_fin);

        String fileName = StringUtils.cleanPath(documentacion.getOriginalFilename());
        try {
            if (fileName.contains("..")) {
                return ResponseEntity.badRequest().body("Nombre de archivo inválido.");
            }
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(documentacion.getInputStream(), targetLocation);

            // Calcular el precio de la reserva
            long diferenciaEnMilisegundos = fechaFin.getTime() - fechaInicio.getTime();
            long diasEntre = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);

            Usuario usuario = usuarioService.buscarPorId(usuario_id);
            usuario.setDireccion(direccion);
            usuario.setDocumentos(targetLocation.toString());
            usuario.setTipoCarnet(tipoCarnet);

            // Diferenciar entre reservas de coche y moto
            if (tipo_vehiculo.equals("coche")) {
                Coches coche = cocheService.buscarPorId(vehiculo_id);
                double precioTotal = coche.getPrecioPorDia() * diasEntre;
                Reservas reserva = new Reservas(null, usuario, coche, null, fechaInicio, fechaFin, EstadoReserva.PENDIENTE, precioTotal);
                if (reservaService.guardar(reserva)) {
                    return ResponseEntity.status(HttpStatus.OK).body(1);
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error en la reserva");
                }
            } else {
                Motos moto = motoService.buscarPorId(vehiculo_id);
                double precioTotal = moto.getPrecioPorDia() * diasEntre;
                Reservas reserva = new Reservas(null, usuario, null, moto, fechaInicio, fechaFin, EstadoReserva.CONFIRMADA, precioTotal);
                if (reservaService.guardar(reserva)) {
                    return ResponseEntity.status(HttpStatus.OK).body(1);
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error en la reserva");
                }
            }

        } catch (IOException ex) {
            return ResponseEntity.status(500).body("Error al guardar el archivo.");
        }
    }
}