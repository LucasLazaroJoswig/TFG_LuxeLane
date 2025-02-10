package tfg.luxelane.entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tfg.luxelane.entidades.enums.Disponibilidad;
import tfg.luxelane.entidades.enums.TipoVehiculo;
import tfg.luxelane.entidades.enums.Transmision;

import java.io.Serializable;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "coches")
public class Coches implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String marca;

    @Column(nullable = false, length = 100)
    private String modelo;

    @Column(nullable = false)
    private int año;

    @Column(nullable = false)
    private double precioPorDia;

    @Column(nullable = false)
    private double precioPorHora;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Disponibilidad disponibilidad;

    // Especificaciones técnicas
    private String tipoMotor;
    private int cilindrada;
    private int potenciaHp;

    @Enumerated(EnumType.STRING)
    private Transmision transmision;

    private double capacidadCombustible;

    // Características del vehículo
    private int numeroPuertas;
    private int numeroAsientos;
    private boolean aireAcondicionado;
    private boolean gps;
    private boolean bluetooth;
    private boolean camaraReversa;
    private boolean sensoresEstacionamiento;

    // Seguridad
    private boolean abs;
    private int airbags;
    private boolean controlTraccion;
    private boolean asistenteFrenado;

    // Información adicional
    private String color;
    private int kilometraje;

    @Column(unique = true, nullable = false, length = 20)
    private String placa;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoVehiculo tipoVehiculo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getModelo() {
		return modelo;
	}

	public void setModelo(String modelo) {
		this.modelo = modelo;
	}

	public int getAño() {
		return año;
	}

	public void setAño(int año) {
		this.año = año;
	}

	public double getPrecioPorDia() {
		return precioPorDia;
	}

	public void setPrecioPorDia(double precioPorDia) {
		this.precioPorDia = precioPorDia;
	}

	public double getPrecioPorHora() {
		return precioPorHora;
	}

	public void setPrecioPorHora(double precioPorHora) {
		this.precioPorHora = precioPorHora;
	}

	public Disponibilidad getDisponibilidad() {
		return disponibilidad;
	}

	public void setDisponibilidad(Disponibilidad disponibilidad) {
		this.disponibilidad = disponibilidad;
	}

	public String getTipoMotor() {
		return tipoMotor;
	}

	public void setTipoMotor(String tipoMotor) {
		this.tipoMotor = tipoMotor;
	}

	public int getCilindrada() {
		return cilindrada;
	}

	public void setCilindrada(int cilindrada) {
		this.cilindrada = cilindrada;
	}

	public int getPotenciaHp() {
		return potenciaHp;
	}

	public void setPotenciaHp(int potenciaHp) {
		this.potenciaHp = potenciaHp;
	}

	public Transmision getTransmision() {
		return transmision;
	}

	public void setTransmision(Transmision transmision) {
		this.transmision = transmision;
	}

	public double getCapacidadCombustible() {
		return capacidadCombustible;
	}

	public void setCapacidadCombustible(double capacidadCombustible) {
		this.capacidadCombustible = capacidadCombustible;
	}

	public int getNumeroPuertas() {
		return numeroPuertas;
	}

	public void setNumeroPuertas(int numeroPuertas) {
		this.numeroPuertas = numeroPuertas;
	}

	public int getNumeroAsientos() {
		return numeroAsientos;
	}

	public void setNumeroAsientos(int numeroAsientos) {
		this.numeroAsientos = numeroAsientos;
	}

	public boolean isAireAcondicionado() {
		return aireAcondicionado;
	}

	public void setAireAcondicionado(boolean aireAcondicionado) {
		this.aireAcondicionado = aireAcondicionado;
	}

	public boolean isGps() {
		return gps;
	}

	public void setGps(boolean gps) {
		this.gps = gps;
	}

	public boolean isBluetooth() {
		return bluetooth;
	}

	public void setBluetooth(boolean bluetooth) {
		this.bluetooth = bluetooth;
	}

	public boolean isCamaraReversa() {
		return camaraReversa;
	}

	public void setCamaraReversa(boolean camaraReversa) {
		this.camaraReversa = camaraReversa;
	}

	public boolean isSensoresEstacionamiento() {
		return sensoresEstacionamiento;
	}

	public void setSensoresEstacionamiento(boolean sensoresEstacionamiento) {
		this.sensoresEstacionamiento = sensoresEstacionamiento;
	}

	public boolean isAbs() {
		return abs;
	}

	public void setAbs(boolean abs) {
		this.abs = abs;
	}

	public int getAirbags() {
		return airbags;
	}

	public void setAirbags(int airbags) {
		this.airbags = airbags;
	}

	public boolean isControlTraccion() {
		return controlTraccion;
	}

	public void setControlTraccion(boolean controlTraccion) {
		this.controlTraccion = controlTraccion;
	}

	public boolean isAsistenteFrenado() {
		return asistenteFrenado;
	}

	public void setAsistenteFrenado(boolean asistenteFrenado) {
		this.asistenteFrenado = asistenteFrenado;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public int getKilometraje() {
		return kilometraje;
	}

	public void setKilometraje(int kilometraje) {
		this.kilometraje = kilometraje;
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public TipoVehiculo getTipoVehiculo() {
		return tipoVehiculo;
	}

	public void setTipoVehiculo(TipoVehiculo tipoVehiculo) {
		this.tipoVehiculo = tipoVehiculo;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
	@Override
	public String toString() {
		return "Coches [id=" + id + ", marca=" + marca + ", modelo=" + modelo + ", año=" + año + ", precioPorDia="
				+ precioPorDia + ", precioPorHora=" + precioPorHora + ", disponibilidad=" + disponibilidad
				+ ", tipoMotor=" + tipoMotor + ", cilindrada=" + cilindrada + ", potenciaHp=" + potenciaHp
				+ ", transmision=" + transmision + ", capacidadCombustible=" + capacidadCombustible + ", numeroPuertas="
				+ numeroPuertas + ", numeroAsientos=" + numeroAsientos + ", aireAcondicionado=" + aireAcondicionado
				+ ", gps=" + gps + ", bluetooth=" + bluetooth + ", camaraReversa=" + camaraReversa
				+ ", sensoresEstacionamiento=" + sensoresEstacionamiento + ", abs=" + abs + ", airbags=" + airbags
				+ ", controlTraccion=" + controlTraccion + ", asistenteFrenado=" + asistenteFrenado + ", color=" + color
				+ ", kilometraje=" + kilometraje + ", placa=" + placa + ", tipoVehiculo=" + tipoVehiculo + "]";
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Coches other = (Coches) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}


    
    
}
