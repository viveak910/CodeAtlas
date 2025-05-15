package com.dbms.CodeAtlas.repository;

import com.dbms.CodeAtlas.model.UserHandle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHandleRepository extends JpaRepository<UserHandle, Long> {
    // You can add custom queries if needed
}
