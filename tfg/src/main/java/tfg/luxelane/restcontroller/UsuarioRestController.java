package tfg.luxelane.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import tfg.luxelane.dao.UsuarioDao;
import tfg.luxelane.entidades.Coches;
import tfg.luxelane.entidades.Motos;
import tfg.luxelane.entidades.Usuario;
import tfg.luxelane.entidades.enums.Disponibilidad;
import tfg.luxelane.entidades.enums.Rol;
import tfg.luxelane.repositorio.UsuarioRepository;


@RestController
@CrossOrigin(origins = "*")
public class UsuarioRestController {
	
	@Autowired
	private UsuarioDao userService;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestParam String correo, @RequestParam String contrasena){
	    // Llamamos al servicio para obtener los detalles del usuario
	    Usuario usuario = userService.login(correo, contrasena);
	    System.out.println(usuario);
	    // Verificamos si el usuario es válido
	    if (usuario != null) {
	        // Retornamos una respuesta exitosa con el usuario
	        return ResponseEntity.status(HttpStatus.OK).body(usuario);
	    } else {
	        // Si no es válido, retornamos un error
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad Credentials");
	    }
	}
	@GetMapping("/usuarios/todos")
    public List<Usuario> mostrarTodos(){
    	return userService.buscarTodos();
    }
	
	@GetMapping("/activos")
    public List<Usuario> mostrarActivos(){
    	return userService.buscarPorEstado("S");
    }
	
	@PostMapping("/register")
	public ResponseEntity<?> registro(@RequestParam String correo, @RequestParam String nombre, @RequestParam String apellidos,
	                                  @RequestParam String contrasena, @RequestParam String telefono) {


	    if (userService.buscarPorCorreo(correo) != null) {

	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo electrónico ya está registrado.");
	    }

	    Usuario user = new Usuario(null, nombre, apellidos, correo, contrasena, telefono);
	    user.setRol(Rol.REGISTRADO);
	    user.setEnabled("S");
	    

	    userService.guardar(user);
	    

	    return ResponseEntity.status(HttpStatus.OK).body(user);
	}
	// Método para actulizar y para guardar el evento
		@PutMapping("/modificar/{idUsuario}")
		public ResponseEntity<?> guardar(@RequestBody Usuario usuario, @PathVariable long idUsuario) {
			// Llamamos al servicio para obtener los detalles del usuario
		    Usuario usuario2 = userService.buscarPorId(idUsuario);
		    // Verificamos si el usuario es válido
		    if (usuario2 != null) {
		    	usuario2.setNombre(usuario.getNombre());
			    usuario2.setApellidos(usuario.getApellidos());
			    usuario2.setTelefono(usuario.getTelefono());
			    usuario2.setCorreo(usuario.getCorreo());
		    	userService.actualizar(usuario2);
			    //System.out.println(usuario2);
		    	return ResponseEntity.status(HttpStatus.OK).body(usuario2);
		    } else {
		        // Si no es válido, retornamos un error
		        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad Credentials");
		    }
		}
		
	    @GetMapping("/usuarios/buscador")
	    public List<Usuario> buscar(@RequestParam String palabra) {
	        return usuarioRepository.buscarPorNombreCorreo(palabra);
	    }
}
