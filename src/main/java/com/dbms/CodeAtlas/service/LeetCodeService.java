package com.dbms.CodeAtlas.service;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import okhttp3.*;

import java.io.IOException;

@Service
public class LeetCodeService {
    
    private final OkHttpClient client = new OkHttpClient();
    
    public JSONObject getStats(String username) {
        if (username == null || username.trim().isEmpty()) {
            return createErrorResponse("Username cannot be empty");
        }
        
        // Updated API URL
        String url = String.format("https://leetcode-stats-api.herokuapp.com/%s", username);
        Request request = new Request.Builder()
                .url(url)
                .get() // Cleaner way to specify GET request
                .addHeader("Content-Type", "application/json")
                .build();
        
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                return createErrorResponse("API request failed with status code: " + response.code());
            }
            
            ResponseBody responseBody = response.body();
            if (responseBody == null) {
                return createErrorResponse("Empty response body received");
            }
            
            String responseString = responseBody.string();
            try {
                return new JSONObject(responseString);
            } catch (JSONException e) {
                return createErrorResponse("Error parsing JSON response: " + e.getMessage());
            }
        } catch (IOException e) {
            return createErrorResponse("Network error: " + e.getMessage());
        }
    }
    
    private JSONObject createErrorResponse(String errorMessage) {
        try {
            JSONObject errorJson = new JSONObject();
            errorJson.put("status", "FAILED");
            errorJson.put("comment", errorMessage);
            return errorJson;
        } catch (JSONException e) {
            // In the unlikely event that creating a simple JSON object fails,
            // create a minimal hardcoded error response
            try {
                return new JSONObject("{\"status\":\"FAILED\",\"comment\":\"Fatal error creating error response\"}");
            } catch (JSONException fatal) {
                // This should practically never happen
                return null;
            }
        }
    }
}