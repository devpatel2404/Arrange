package org.example.backend.services;

import org.example.backend.models.*;
import org.example.backend.repositories.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.*;
import org.springframework.stereotype.*;

@Component
public class CLIService implements CommandLineRunner {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            Role admin = new Role();
            admin.setName("ROLE_ADMIN");
            roleRepository.save(admin);

            Role moderator = new Role();
            moderator.setName("ROLE_MOD");
            roleRepository.save(moderator);

            Role user = new Role();
            user.setName("ROLE_USER");
            roleRepository.save(user);
        }
    }
}
