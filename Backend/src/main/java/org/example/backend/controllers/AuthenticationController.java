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
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/userInfo")
    public ResponseEntity<UserInsensitiveDTO> getUserInfo(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        Optional<Cookie> tokenCookieOpt = Arrays.stream(cookies)
                .filter(cookie -> "token".equals(cookie.getName()))
                .findFirst();

        if (tokenCookieOpt.isPresent()) {
            Cookie tokenCookie = tokenCookieOpt.get();
            String token = tokenCookie.getValue();

            if (jwtService.isTokenValid(token, userRepository.findByUsername(jwtService.extractUsername(token)))) {
                User user = userRepository.findByUsername(jwtService.extractUsername(token));
                if (user != null) {
                    UserInsensitiveDTO userDTO = new UserInsensitiveDTO(
                            user.getName(),
                            user.getEmail(),
                            user.getUsername()
                    );
                    return new ResponseEntity<>(userDTO, HttpStatus.OK);
                }
            }
        }
        return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
    }
}
