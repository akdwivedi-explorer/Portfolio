package com.ashutosh.portfolio;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@org.springframework.context.annotation.ComponentScan(basePackages = "com.ashutosh.portfolio")
public class PortfolioApplication {

  public static void main(String[] args) {
      // Load .env file manually into System properties before Spring Boot starts
      try {
          Dotenv dotenv = Dotenv.configure()
                  .directory("./env")
                  .filename(".env")
                  .load();
          dotenv.entries().forEach(entry -> {
              System.setProperty(entry.getKey(), entry.getValue());
          });
          System.out.println(">>> Global Environment Context Primed.");
      } catch (Exception e) {
          System.err.println(">>> WARNING: Root .env load failed. Using defaults.");
      }
      
      SpringApplication.run(PortfolioApplication.class, args);
  }

}
