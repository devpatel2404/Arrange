package org.example.backend.security;

import com.nylas.*;
import lombok.*;
import okhttp3.*;
import org.springframework.context.annotation.*;

@Configuration
public class NylasConfig {
    @Value("${nylas.client.id}")
    private String clientID;

    @Value('${nylas.client.secret}')
    private String secret;

    @Value('${nylas.client.url}')
    private String url;

    @Bean
    public NylasClient nylasClient(){
        return new NylasClient(secret, new OkHttpClient.Builder(), url);
    }
}
