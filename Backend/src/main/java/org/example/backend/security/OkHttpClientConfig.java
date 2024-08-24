package org.example.backend.security;

import com.nylas.interceptors.*;
import okhttp3.*;
import org.springframework.context.annotation.*;

import java.util.*;
import java.util.concurrent.*;

@Configuration
public class OkHttpClientConfig {
    @Bean
    public OkHttpClient okHttpClient() {
        return new OkHttpClient.Builder()
                .connectionPool(new ConnectionPool(5, 5, TimeUnit.SECONDS))
                .protocols(Collections.singletonList(Protocol.HTTP_2))
                .connectTimeout(10, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .addInterceptor(new HttpLoggingInterceptor())
                .retryOnConnectionFailure(true)
                .build();
    }
}
