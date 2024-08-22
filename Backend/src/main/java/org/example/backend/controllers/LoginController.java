package org.example.backend.controllers;

import jakarta.servlet.http.*;
import org.example.backend.models.*;
import org.example.backend.models.DTO.*;
import org.example.backend.repositories.*;
import org.example.backend.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.*;
import java.util.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class LoginController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegisterDTO user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("{\"success\": \"" + "User Registered" + "\"}");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserLoginDTO userLogin) {
        try {
            User loggedUser = userService.loginUser(userLogin);
            loggedUser.setLastActivity(new Date());
            String token = userService.generateToken(loggedUser);
            ResponseCookie cookie = userService.makeCookie(token);
            HttpServletResponse httpResponse = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
            httpResponse.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            return ResponseEntity.ok("{\"token\": \"" + cookie + "\"}");

        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<String> forgotPassword(@RequestBody User user) {
        if ( (user.getEmail() == null && user.getUsername() == null)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Invalid email or password\"}");
        }
        else {
            return ResponseEntity.ok("{\"token\": \"" + "Email sent" + "\"}");
        }
    }
}
