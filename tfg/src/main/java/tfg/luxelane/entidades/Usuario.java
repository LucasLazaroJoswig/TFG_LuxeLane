package tfg.luxelane.entidades;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

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
@EqualsAndHashCode(of = "correo")
@Builder
@Entity
@Table(name = "usuarios")
public class Usuario implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_completo", nullable = false)
    private String nombreCompleto;

    @Column(unique = true, nullable = false)
    private String correo;

    @Column(name = "contraseña_hash", nullable = false)
    private String password;

    @Column(length = 20)
    private String telefono;

    private String direccion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol;

    private String fotoPerfil;
    private String documentos;

    @Column(nullable = false)
    private Boolean enabled;

    // Campos específicos para choferes
    private String licencia;

    @Temporal(TemporalType.DATE)
    private Date fechaVencimientoLicencia;

    private String categoriaLicencia;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombreCompleto() {
		return nombreCompleto;
	}

	public void setNombreCompleto(String nombreCompleto) {
		this.nombreCompleto = nombreCompleto;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public Rol getRol() {
		return rol;
	}

	public void setRol(Rol rol) {
		this.rol = rol;
	}

	public String getFotoPerfil() {
		return fotoPerfil;
	}

	public void setFotoPerfil(String fotoPerfil) {
		this.fotoPerfil = fotoPerfil;
	}

	public String getDocumentos() {
		return documentos;
	}

	public void setDocumentos(String documentos) {
		this.documentos = documentos;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public String getLicencia() {
		return licencia;
	}

	public void setLicencia(String licencia) {
		this.licencia = licencia;
	}

	public Date getFechaVencimientoLicencia() {
		return fechaVencimientoLicencia;
	}

	public void setFechaVencimientoLicencia(Date fechaVencimientoLicencia) {
		this.fechaVencimientoLicencia = fechaVencimientoLicencia;
	}

	public String getCategoriaLicencia() {
		return categoriaLicencia;
	}

	public void setCategoriaLicencia(String categoriaLicencia) {
		this.categoriaLicencia = categoriaLicencia;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	

	@Override
	public String toString() {
		return "Usuario [id=" + id + ", nombreCompleto=" + nombreCompleto + ", correo=" + correo + ", password="
				+ password + ", telefono=" + telefono + ", direccion=" + direccion + ", rol=" + rol + ", fotoPerfil="
				+ fotoPerfil + ", documentos=" + documentos + ", enabled=" + enabled + ", licencia=" + licencia
				+ ", fechaVencimientoLicencia=" + fechaVencimientoLicencia + ", categoriaLicencia=" + categoriaLicencia
				+ "]";
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		return Objects.equals(correo, other.correo) && Objects.equals(id, other.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(correo, id);
	}
    
    
}
