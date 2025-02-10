package tfg.luxelane.entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "resenas")
public class Resenas implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "coche_id")
    private Coches coche;

    @ManyToOne
    @JoinColumn(name = "moto_id")
    private Motos moto;

    @Column(nullable = false)
    private int calificacion;

    private String comentario;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date fecha;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Coches getCoche() {
		return coche;
	}

	public void setCoche(Coches coche) {
		this.coche = coche;
	}

	public Motos getMoto() {
		return moto;
	}

	public void setMoto(Motos moto) {
		this.moto = moto;
	}

	public int getCalificacion() {
		return calificacion;
	}

	public void setCalificacion(int calificacion) {
		this.calificacion = calificacion;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		return Objects.hash(calificacion, coche, comentario, fecha, id, moto, usuario);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Resenas other = (Resenas) obj;
		return calificacion == other.calificacion && Objects.equals(coche, other.coche)
				&& Objects.equals(comentario, other.comentario) && Objects.equals(fecha, other.fecha)
				&& Objects.equals(id, other.id) && Objects.equals(moto, other.moto)
				&& Objects.equals(usuario, other.usuario);
	}

	public Resenas(Long id, Usuario usuario, Coches coche, Motos moto, int calificacion, String comentario,
			Date fecha) {
		super();
		this.id = id;
		this.usuario = usuario;
		this.coche = coche;
		this.moto = moto;
		this.calificacion = calificacion;
		this.comentario = comentario;
		this.fecha = fecha;
	}

	@Override
	public String toString() {
		return "Resenas [id=" + id + ", usuario=" + usuario + ", coche=" + coche + ", moto=" + moto + ", calificacion="
				+ calificacion + ", comentario=" + comentario + ", fecha=" + fecha + "]";
	}
    
    
}
