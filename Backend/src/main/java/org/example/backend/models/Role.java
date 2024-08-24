package org.example.backend.models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.*;

import java.util.*;

@Getter
@Setter
@Entity
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @ManyToMany(mappedBy = "roles")
    private Set<User> users;

    @Override
    public String getAuthority() {
        return "ROLE_" + name;
    }
}
