package com.jwt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JsonWebTokenApplication {

	public static void main(String[] args) {
		SpringApplication.run(JsonWebTokenApplication.class, args);
	}

	/*
	 https://www.bezkoder.com/spring-boot-security-postgresql-jwt-authentication/


	 INSERT INTO roles(name) VALUES('ROLE_USER');
	 INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
	 INSERT INTO roles(name) VALUES('ROLE_ADMIN');

	 POST: http://localhost:9999/api/auth/signup
	 {
		"username": "admin",
		"email": "admin@hotmail.com",
		"password": "123456",
		"role":["admin"]
	}

	POST: http://localhost:9999/api/auth/signup
	{
		"username": "mod",
		"email": "mod@hotmail.com",
		"password": "123456",
		"role":["mod", "user"]
	}

	POST: http://localhost:9999/api/auth/signup
	{
		"username": "user",
		"email": "user@hotmail.com",
		"password": "123456",
		"role":["user"]
	}

	*/
}
