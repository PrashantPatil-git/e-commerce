package com.bookcharm.app.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AddProductDto{

    private String productName;
    private BigDecimal productPrice;
    private String productDescription;
    private String productImage;
    private String category;
    private int stock;
    private String author;
    private String isbn;
}

