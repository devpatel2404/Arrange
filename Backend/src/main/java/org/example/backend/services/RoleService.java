package org.example.backend.services;

import org.example.backend.models.Role;
import org.example.backend.repositories.*;
import org.springframework.boot.*;
import org.springframework.context.annotation.*;

public class RoleService {
    @Bean
    CommandLineRunner init(RoleRepository roleRepository) {
        return args -> {
            org.example.backend.models.Role userRole = new org.example.backend.models.Role();
            userRole.setName("ROLE_USER");

            org.example.backend.models.Role adminRole = new Role();
            adminRole.setName("ROLE_ADMIN");

            roleRepository.save(userRole);
            roleRepository.save(adminRole);
        };
    }
}
