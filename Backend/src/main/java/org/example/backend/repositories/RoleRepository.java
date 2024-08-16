package org.example.backend.repositories;

import org.example.backend.models.*;
import org.springframework.data.repository.*;

public interface RoleRepository extends CrudRepository<Role, Long> {
    public Role findByName(String name);
}
