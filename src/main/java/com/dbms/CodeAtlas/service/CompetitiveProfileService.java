package com.dbms.CodeAtlas.service;

import com.dbms.CodeAtlas.model.CompetitiveProfile;
import com.dbms.CodeAtlas.repository.CompetitiveProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class CompetitiveProfileService {
    private final CompetitiveProfileRepository competitiveProfileRepository;

    public CompetitiveProfileService(CompetitiveProfileRepository competitiveProfileRepository) {
        this.competitiveProfileRepository = competitiveProfileRepository;
    }

    public CompetitiveProfile saveCompetitiveProfile(CompetitiveProfile profile) {
        return competitiveProfileRepository.save(profile);
    }
}
