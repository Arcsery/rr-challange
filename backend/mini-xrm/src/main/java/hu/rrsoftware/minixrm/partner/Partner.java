package hu.rrsoftware.minixrm.partner;

import hu.rrsoftware.minixrm.activity.Activity;
import hu.rrsoftware.minixrm.enums.PartnerStatus;
import hu.rrsoftware.minixrm.enums.QualificationType;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "partners")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Partner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    private Long version;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, unique = true, length = 50)
    private String taxNumber;

    @Column(nullable = false)
    private String headquarters;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PartnerStatus status;

    @ElementCollection(targetClass = QualificationType.class)
    @CollectionTable(
            name = "partner_qualifications",
            joinColumns = @JoinColumn(name = "partner_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "qualification", nullable = false, length = 30)
    private Set<QualificationType> qualifications = new HashSet<>();

    @OneToMany(mappedBy = "partner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Activity> activities = new ArrayList<>();
}
