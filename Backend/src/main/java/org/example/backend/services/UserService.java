package org.example.backend.services;

import org.example.backend.models.*;
import org.example.backend.models.DTO.*;
import org.example.backend.repositories.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.stereotype.*;
import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    BCryptPasswordEncoder encoder;
    @Autowired
    JwtService jwtService;

    public String encodePassword(String rawPassword) {
        return encoder.encode(rawPassword);
    }

    public boolean matches(String rawPassword, User user) {
        return encoder.matches(rawPassword, user.getPassword());
    }

    public String generateToken(User user) {
        return jwtService.generateToken(userRepository.findByUsername(user.getUsername()));
    }

    public User registerUser(UserRegisterDTO userDTO) {
        if (userRepository.findByUsername(userDTO.getUsername()) != null){
            throw new IllegalArgumentException("Username already exists");
        }
        else if (userRepository.findByEmail(userDTO.getEmail()) != null) {
            throw new IllegalArgumentException("Email address already in use");
        }
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(encodePassword(userDTO.getPassword()));
        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        user.setCreatedAt(new Date());
        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findByName("ROLE_USER"));
        user.setRoles(roles);
        userRepository.save(user);
        return user;
    }

    public User loginUser(UserLoginDTO userLogin) {
        if ( userLogin.getEmailOrUsername() == null  || userLogin.getPassword() == null ) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        else if (userRepository.findByEmail(userLogin.getEmailOrUsername()) != null &&
                matches(userLogin.getPassword(), userRepository.findByEmail(userLogin.getEmailOrUsername()))) {
            return userRepository.findByEmail(userLogin.getEmailOrUsername());
        }
        else if (userRepository.findByUsername(userLogin.getEmailOrUsername()) != null &&
                matches(userLogin.getPassword(), userRepository.findByUsername(userLogin.getEmailOrUsername()))) {
            return userRepository.findByUsername(userLogin.getEmailOrUsername());
        }
        throw new IllegalArgumentException("User cannot be logged in");
    }
}
