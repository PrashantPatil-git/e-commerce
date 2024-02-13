package com.bookcharm.app.service;

import com.bookcharm.app.model.Admin;
import com.bookcharm.app.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    private final Map<Long, Admin> adminDatabase = new HashMap<>();

    @Override
    public Admin getAdminById(Long adminId) {
        return adminDatabase.get(adminId);
    }

    @Override
    public Admin createAdmin(Admin admin) {
        Admin newAdmin = adminRepository.save(admin);
        adminDatabase.put(newAdmin.getAdminId(), newAdmin);
        return newAdmin;
    }

    @Override
    public Admin updateAdmin(Long adminId, Admin updatedAdmin) {
        if (adminDatabase.containsKey(adminId)) {
            adminDatabase.put(adminId, updatedAdmin);
            return updatedAdmin;
        }
        return null;
    }

    @Override
    public boolean deleteAdmin(Long adminId) {
        return adminDatabase.remove(adminId) != null;
    }

    // You can add other AdminService methods as needed

}
