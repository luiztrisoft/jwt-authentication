package com.jwt.rest.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping("/all")
    public String allAccess() {
        return "Conteúdo público e desprotegido";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")//Não precisa anotar ja que é aberto a todos
    public String userAccess() {
        return "Acesso LV. I";
    }

    @GetMapping("/mod")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public String moderatorAccess() {
        return "Acesso LV. II";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")//Ao colocar na declaração da classe, ele configura para todos os métodos
    public String adminAccess() {
        return "Acesso LV. III";
    }
}