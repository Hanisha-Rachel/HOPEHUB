package com.hopehub.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

@SpringBootApplication
public class HopeHubApplication {

    public static void main(String[] args) {
        loadDotEnvIfPresent();
        SpringApplication.run(HopeHubApplication.class, args);
    }

    /**
     * Reads backend/.env or .env file if present and populates System properties
     * without requiring any third-party dotenv dependencies.
     */
    private static void loadDotEnvIfPresent() {
        File[] possibleFiles = new File[]{
            new File(".env"),
            new File("backend/.env"),
            new File("../.env")
        };

        for (File file : possibleFiles) {
            if (file.exists() && file.isFile()) {
                try (FileInputStream fis = new FileInputStream(file)) {
                    Properties props = new Properties();
                    props.load(fis);
                    for (String key : props.stringPropertyNames()) {
                        if (System.getProperty(key) == null && System.getenv(key) == null) {
                            System.setProperty(key, props.getProperty(key));
                        }
                    }
                    System.out.println("[HOPEHUB] Loaded environment configuration from: " + file.getAbsolutePath());
                    break;
                } catch (IOException ignored) {
                }
            }
        }
    }
}
