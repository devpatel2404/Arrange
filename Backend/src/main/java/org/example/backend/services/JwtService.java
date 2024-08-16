package org.example.backend.services;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.*;
import io.jsonwebtoken.security.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.security.*;
import java.util.*;
import java.util.function.*;

@Service
public class JwtService {
    @Value("${security.jwt.secret-key}")
    private String securityKey;
    @Value("${security.jwt.expiration-time}")
    private long expirationTime;

    public String extractUsername(String token) { return extractClaim(token, Claims::getSubject);}

    public String generateToken(UserDetails userDetails) { return generateToken(new HashMap<>(), userDetails);}

    public String generateToken(Map<String, Object> claims, UserDetails userDetails) {
        return buildTokens(claims, userDetails, expirationTime);
    }

    public String buildTokens(Map<String, Object> claims, UserDetails userDetails, long expirationTime) {
        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJwt(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(securityKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) { return extractClaim(token, Claims::getExpiration);}
}
