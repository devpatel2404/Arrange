package org.example.backend.models.DTO;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserLoginDTO {
    private String emailOrUsername;
    private String password;
}
