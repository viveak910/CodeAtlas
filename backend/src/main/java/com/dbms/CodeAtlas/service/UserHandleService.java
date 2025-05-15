package com.dbms.CodeAtlas.service;

import com.dbms.CodeAtlas.model.UserHandle;
import com.dbms.CodeAtlas.repository.UserHandleRepository;
import org.springframework.stereotype.Service;

@Service
public class UserHandleService {
    private final UserHandleRepository userHandleRepository;

    public UserHandleService(UserHandleRepository userHandleRepository) {
        this.userHandleRepository = userHandleRepository;
    }

    public UserHandle saveUserHandle(UserHandle userHandle) {
        return userHandleRepository.save(userHandle);
    }
}
