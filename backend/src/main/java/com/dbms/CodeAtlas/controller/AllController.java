package com.dbms.CodeAtlas.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable; // ✅ Required for @PathVariable
import org.springframework.web.bind.annotation.RestController;
import com.dbms.CodeAtlas.model.CompetitiveProfile;
import com.dbms.CodeAtlas.repository.CompetitiveProfileRepository;

import java.util.List;

@RestController
public class AllController {

    private final CompetitiveProfileRepository repository;

    public AllController(CompetitiveProfileRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/profiles")
    public List<CompetitiveProfile> getAllProfiles() {
        return repository.findAll();
    }

    @GetMapping("/profiles/{username}/stats")
    public ResponseEntity<List<CompetitiveProfile>> getProfileByUsername(@PathVariable String username) {
        List<CompetitiveProfile> profiles = repository.findAllByUserId(username);
        if (profiles.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(profiles);
    }
    @GetMapping("/hello")
    public String helloString(){
        return "hello world";
    }
}
