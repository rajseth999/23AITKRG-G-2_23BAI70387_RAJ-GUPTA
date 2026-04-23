package com.experiment9.config;

import com.experiment9.model.ERole;
import com.experiment9.model.Role;
import com.experiment9.model.User;
import com.experiment9.model.Product;
import com.experiment9.repository.RoleRepository;
import com.experiment9.repository.UserRepository;
import com.experiment9.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired RoleRepository roleRepository;
    @Autowired UserRepository userRepository;
    @Autowired ProductRepository productRepository;
    @Autowired PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Seed Roles
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role(ERole.ROLE_USER));
            roleRepository.save(new Role(ERole.ROLE_MODERATOR));
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
        }

        // Seed Users
        if (userRepository.count() == 0) {
            // Admin user
            User admin = new User("admin", "admin@experiment9.com",
                    passwordEncoder.encode("Admin@123"));
            Set<Role> adminRoles = new HashSet<>();
            roleRepository.findByName(ERole.ROLE_ADMIN).ifPresent(adminRoles::add);
            roleRepository.findByName(ERole.ROLE_USER).ifPresent(adminRoles::add);
            admin.setRoles(adminRoles);
            userRepository.save(admin);

            // Moderator user
            User mod = new User("moderator", "mod@experiment9.com",
                    passwordEncoder.encode("Mod@123"));
            Set<Role> modRoles = new HashSet<>();
            roleRepository.findByName(ERole.ROLE_MODERATOR).ifPresent(modRoles::add);
            roleRepository.findByName(ERole.ROLE_USER).ifPresent(modRoles::add);
            mod.setRoles(modRoles);
            userRepository.save(mod);

            // Regular user
            User user = new User("user", "user@experiment9.com",
                    passwordEncoder.encode("User@123"));
            Set<Role> userRoles = new HashSet<>();
            roleRepository.findByName(ERole.ROLE_USER).ifPresent(userRoles::add);
            user.setRoles(userRoles);
            userRepository.save(user);
        }

        // Seed Products
        if (productRepository.count() == 0) {
            productRepository.save(new Product(null, "Laptop Pro", "High-end laptop", 1299.99, "Electronics", 50));
            productRepository.save(new Product(null, "Wireless Mouse", "Ergonomic mouse", 29.99, "Electronics", 200));
            productRepository.save(new Product(null, "Java Programming Book", "Core Java guide", 49.99, "Books", 100));
            productRepository.save(new Product(null, "Standing Desk", "Adjustable height desk", 399.99, "Furniture", 30));
            productRepository.save(new Product(null, "Mechanical Keyboard", "RGB backlit keyboard", 89.99, "Electronics", 150));
            productRepository.save(new Product(null, "Spring Boot in Action", "Spring Boot reference", 39.99, "Books", 80));
        }
    }
}
