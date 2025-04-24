package com.dbms.CodeAtlas.controller;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import com.dbms.CodeAtlas.service.LeetCodeService;

@RestController
@RequestMapping("/leetcode")
public class LeetCodeController {

    private final LeetCodeService leetCodeService;

    public LeetCodeController(LeetCodeService leetCodeService) {
        this.leetCodeService = leetCodeService;
    }

    @GetMapping("/{username}")
    public String getStats(@PathVariable String username) {
        JSONObject result = leetCodeService.getStats(username);
        return result.toString();
    }
}