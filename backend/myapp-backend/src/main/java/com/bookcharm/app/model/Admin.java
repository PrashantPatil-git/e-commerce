package com.bookcharm.app.model;

import javax.persistence.*;

@Entity
@Table(name = "Admins")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "adminId")
    private Long adminId;

    @JoinColumn(name = "email")
    private String email;

    @JoinColumn(name = "passWord")
    private String passWord;

    @OneToOne
    @JoinColumn(name = "addressId")
    private Address address;


    // Constructors
    public Admin() {
    }

    public Admin(String email, String passWord) {
        this.email = email;
        this.passWord = passWord;
    }

    // Getters and Setters
    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public String getUsername() {
        return email;
    }

    public void setUsername(String username) {
        this.email = username;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    // Other methods, if needed

    @Override
    public String toString() {
        return "Admin{" +
                "adminId=" + adminId +
                ", email='" + email + '\'' +
                ", password='" + passWord + '\'' +
                '}';
    }
}
