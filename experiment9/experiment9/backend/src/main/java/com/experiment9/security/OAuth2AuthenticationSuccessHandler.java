package com.experiment9.security;

import com.experiment9.model.AuthProvider;
import com.experiment9.model.ERole;
import com.experiment9.model.Role;
import com.experiment9.model.User;
import com.experiment9.repository.RoleRepository;
import com.experiment9.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired private JwtUtils jwtUtils;
    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = oauthUser.getAttribute("email");
        String name  = oauthUser.getAttribute("name");
        String sub   = oauthUser.getAttribute("sub");

        // Provision user if first OAuth2 login
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername(email.split("@")[0]);
            newUser.setProvider(AuthProvider.GOOGLE);
            newUser.setProviderId(sub);

            Set<Role> roles = new HashSet<>();
            roleRepository.findByName(ERole.ROLE_USER)
                    .ifPresent(roles::add);
            newUser.setRoles(roles);
            return userRepository.save(newUser);
        });

        String token = jwtUtils.generateTokenFromUsername(user.getUsername());
        String redirectUrl = frontendUrl + "/oauth2/callback?token=" + token;
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
