package com.dbms.CodeAtlas.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
public class CodeforcesService {

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://codeforces.com/api")
            .build();

    public String getUserInfo(String username) {
        try {
            return webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/user.info")
                            .queryParam("handles", username)
                            .build())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (WebClientResponseException e) {
            return "{\"status\":\"FAILED\",\"comment\":\"" + e.getMessage() + "\"}";
        }
    }
}