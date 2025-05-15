package com.dbms.CodeAtlas.controller;

import com.dbms.CodeAtlas.model.UserHandle;
import com.dbms.CodeAtlas.model.CompetitiveProfile;
import com.dbms.CodeAtlas.repository.CompetitiveProfileRepository;
import com.dbms.CodeAtlas.service.CodeforcesService;
import com.dbms.CodeAtlas.service.LeetCodeService;
import com.dbms.CodeAtlas.repository.UserHandleRepository;

import org.json.JSONObject;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);
    private final CodeforcesService codeforcesService;
    private final LeetCodeService leetCodeService;
        private final CompetitiveProfileRepository profileRepository;
        private final UserHandleRepository userHandleRepository;
    public ProfileController(CompetitiveProfileRepository profileRepository,
                             CodeforcesService codeforcesService,
                             LeetCodeService leetCodeService,UserHandleRepository userHandleRepository) {   
        this.profileRepository = profileRepository;
        this.codeforcesService = codeforcesService;
        this.leetCodeService = leetCodeService;
        this.userHandleRepository = userHandleRepository;
    }

    @PostMapping
    public ResponseEntity<CompetitiveProfile> getFullProfile(@RequestBody UserHandle request) {
        String leetcodeUsername = request.getLeetcodeUsername();
        String codeforcesUsername = request.getCodeforcesUsername();

        CompetitiveProfile profile = new CompetitiveProfile();
        profile.setUserId(request.getUserId());
        profile.setCfHandle(codeforcesUsername);
        profile.setLcHandle(leetcodeUsername);
        profile.setCollege(request.getCollege());

        try {
            JSONObject leetCodeData = leetCodeService.getStats(leetcodeUsername);
            profile.setLcTotalSolved(leetCodeData.getInt("totalSolved"));
            profile.setLcTotalQuestions(leetCodeData.getInt("totalQuestions"));
            profile.setLcEasySolved(leetCodeData.getInt("easySolved"));
            profile.setLcMediumSolved(leetCodeData.getInt("mediumSolved"));
            profile.setLcHardSolved(leetCodeData.getInt("hardSolved"));
            profile.setLcAcceptanceRate(leetCodeData.getDouble("acceptanceRate"));
            profile.setLcRanking(leetCodeData.getInt("ranking"));
        } catch (JSONException e) {
            logger.warn("Failed to parse LeetCode data for user: {}", leetcodeUsername, e);
        } catch (Exception e) {
            logger.error("Error fetching LeetCode stats for user: {}", leetcodeUsername, e);
        }

        try {
            String codeforcesRawData = codeforcesService.getUserInfo(codeforcesUsername);
            if (codeforcesRawData != null && !codeforcesRawData.isEmpty()) {
                JSONObject codeforcesResponse = new JSONObject(codeforcesRawData);
                if (codeforcesResponse.getString("status").equals("OK") && codeforcesResponse.has("result")) {
                    JSONObject codeforcesData = codeforcesResponse.getJSONArray("result").getJSONObject(0);
                    profile.setCfRating(codeforcesData.getInt("rating"));
                    profile.setCfMaxRating(codeforcesData.getInt("maxRating"));
                    profile.setCfRank(codeforcesData.getString("rank"));
                    profile.setCfMaxRank(codeforcesData.getString("maxRank"));
                } else {
                    logger.warn("Invalid Codeforces response format for user: {}", codeforcesUsername);
                }
            } else {
                logger.warn("No Codeforces data returned for user: {}", codeforcesUsername);
            }
        } catch (JSONException e) {
            logger.warn("Failed to parse Codeforces data for user: {}", codeforcesUsername, e);
        } catch (Exception e) {
            logger.error("Error fetching Codeforces info for user: {}", codeforcesUsername, e);
        }

        logger.debug("Generated profile for user: {}", request.getUserId());

        // 🔥 Save to PostgreSQL
        profileRepository.save(profile);
        userHandleRepository.save(request);

        return ResponseEntity.ok(profile);
    }
}
