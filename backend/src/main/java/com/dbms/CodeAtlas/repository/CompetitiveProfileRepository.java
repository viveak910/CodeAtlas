package com.dbms.CodeAtlas.repository;

import com.dbms.CodeAtlas.model.CompetitiveProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface CompetitiveProfileRepository extends JpaRepository<CompetitiveProfile, Long> {
    // You can add custom queries if needed
    List<CompetitiveProfile> findAllByUserId(String UserId);
}
