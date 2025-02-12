package tfg.luxelane.entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tfg.luxelane.entidades.enums.Disponibilidad;
import tfg.luxelane.entidades.enums.EtiquetaMedioambiental;
import tfg.luxelane.entidades.enums.Rol;
import tfg.luxelane.entidades.enums.TipoVehiculo;
import tfg.luxelane.entidades.enums.Transmision;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
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
    @Enumerated(EnumType.STRING)
    private EtiquetaMedioambiental etiquetaMedioambiental;
    private String color;
    private int kilometraje;

    @Column(unique = true, nullable = false, length = 20)
    private String matricula;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoVehiculo tipoVehiculo;

}
