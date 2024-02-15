package com.bookcharm.app.model;

import javax.persistence.*;
import javax.websocket.ClientEndpoint;

@Entity
@Table(name = "Sellers")
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "sellerId")
    private Long sellerId;
    @JoinColumn(name = "productCount")
    private int productCount;
    @JoinColumn(name = "firstName")
    private String firstName;
    @JoinColumn(name = "lastName")
    private String lastName;
    @JoinColumn(name = "panNumber")
    private String panNumber;
    @JoinColumn(name = "mobileNumber")
    private String mobileNumber;
    @JoinColumn(name = "email")
    private String email;
    @JoinColumn(name = "passWord")
    private String passWord;
    

    // Constructors
    public Seller() {
    }

    public Seller(int productCount, String firstName, String lastName, String panNumber, String mobileNumber, String email, String passWord) {
        this.productCount = productCount;
        this.firstName = firstName;
        this.lastName = lastName;
        this.panNumber = panNumber;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.passWord = passWord;
    }

    // Getters and Setters
    public Long getSellerId() {
        return sellerId;
    }



    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public int getProductCount() {
        return productCount;
    }

    public void setProductCount(int productCount) {
        this.productCount = productCount;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
        return "Seller{" +
                "sellerId=" + sellerId +
                ", productCount=" + productCount +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", panNumber='" + panNumber + '\'' +
                ", mobileNumber='" + mobileNumber + '\'' +
                ", email='" + email + '\'' +
                ", passWord='" + passWord + '\'' +
                '}';
    }
}
