package com.bookcharm.app.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;

public class FileUtils {


    public static String storeImage(String rootDirName, MultipartFile file){

        try {
            if(file.isEmpty()) {
                throw new RuntimeException("Empty file");
            }

            // Get the current time in milliseconds
            long currentTimeMillis = Calendar.getInstance().getTimeInMillis();
            // Generate the filename using the current time in milliseconds
            String fileName = currentTimeMillis + "_" + file.getOriginalFilename();

            Path destination = Paths.get(rootDirName).resolve(fileName).normalize().toAbsolutePath();
            System.out.println(destination);

            InputStream  is= file.getInputStream();
            Files.copy(is, destination);

            is.close();
            return fileName;

        } catch(IOException e) {
            e.printStackTrace();
            throw new RuntimeException("empty store");
        }

    }
}
