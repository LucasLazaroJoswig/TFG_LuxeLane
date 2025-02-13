package tfg.luxelane.entidades;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tfg.luxelane.entidades.enums.Rol;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = {"correo","id"})
@Builder
@Entity
@Table(name = "usuarios")
public class Usuario implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 255)
    private String apellidos;

    @Column(unique = true, nullable = false)
    private String correo;

    @Column(name = "contrasena", nullable = false)
    private String password;

    @Column(length = 20)
    private String telefono;

    private String direccion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol;

    private String fotoPerfil;
    private String documentos;

    @Column(nullable = false, length = 1)
    private String enabled; // Debe ser 'S' o 'N'

    // Campos específicos para choferes
    private String licencia;

    @Temporal(TemporalType.DATE)
    private Date fechaVencimientoLicencia;

    private String categoriaLicencia;

	public Usuario(Long id, String nombre, String apellidos, String correo, String password, String telefono) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.correo = correo;
		this.password = password;
		this.telefono = telefono;
	}

	public Rol getRol() {
		return rol;
	}

	public void setRol(Rol rol) {
		this.rol = rol;
	}

	public String getEnabled() {
		return enabled;
	}

	public void setEnabled(String enabled) {
		this.enabled = enabled;
	}

	public Usuario() {
		super();
		// TODO Auto-generated constructor stub
	}

	
    
    
}
