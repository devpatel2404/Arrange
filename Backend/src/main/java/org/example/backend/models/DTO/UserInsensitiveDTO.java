package org.example.backend.models.DTO;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserInsensitiveDTO {
    private String name;
    private String email;
    private String username;
}
