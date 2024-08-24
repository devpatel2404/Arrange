package org.example.backend.controllers;

import jakarta.servlet.http.*;
import org.example.backend.models.DTO.*;
import org.example.backend.models.User;
import org.example.backend.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.*;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    @Autowired
    UserService userService;
    @Autowired
    JwtService jwtService;
    LoggerService loggerService = new LoggerService();

    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN' , 'ROLE_MOD', 'ROLE_USER')")
    public ResponseEntity<UserInsensitiveDTO> findUser(@RequestParam String[] username) {
        User target = userService.containsUser(username[0]);
        loggerService.info(username[0]);
        if (target == null) return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        loggerService.info(target.getName());
        return new ResponseEntity<>(new UserInsensitiveDTO(
                target.getName(),
                target.getEmail(),
                target.getUsername())
                , HttpStatus.OK);
    }

    @PutMapping("/bio")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<String> putBio(HttpServletRequest bio)
            throws IOException {
        User a = userService.extractUser(bio.getCookies());
        BufferedReader reader = bio.getReader();
        a.setBio(reader.readLine());

        return ResponseEntity.ok("Bio updated successfully");
    }
}
