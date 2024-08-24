package org.example.backend.controllers;

import jakarta.servlet.http.*;
import org.example.backend.models.*;
import org.example.backend.models.DTO.*;
import org.example.backend.repositories.*;
import org.example.backend.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    LoggerService loggerService = new LoggerService();

    @GetMapping("/userInfo")
    public ResponseEntity<UserInsensitiveDTO> getUserInfo(HttpServletRequest request) {
        UserInsensitiveDTO dto = userService.copyUserToDTO(userService.extractUser(request.getCookies()));
        if (dto != null) return new ResponseEntity<>(dto, HttpStatus.OK);
        else return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
    }
}
