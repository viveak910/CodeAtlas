package com.dbms.CodeAtlas.controller;

import com.dbms.CodeAtlas.service.CodeforcesService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/codeforces")
public class CodeforcesController {

    private final CodeforcesService codeforcesService;

    public CodeforcesController(CodeforcesService codeforcesService) {
        this.codeforcesService = codeforcesService;
    }

    @GetMapping("/{username}")
    public String getUserStats(@PathVariable String username) {
        return codeforcesService.getUserInfo(username);
    }
}

