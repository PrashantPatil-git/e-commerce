package com.bookcharm.app.repository;

import com.bookcharm.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Additional user-specific query methods if needed
}
