package com.bookcharm.app.service;

import com.bookcharm.app.model.Admin;

public interface AdminService {
    Admin getAdminById(Long adminId);
    Admin createAdmin(Admin admin);
    Admin updateAdmin(Long adminId, Admin admin);
    boolean deleteAdmin(Long adminId);
    // Other AdminService methods
}
