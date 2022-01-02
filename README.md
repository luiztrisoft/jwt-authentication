# jwt-authentication
Implementação de autorização e autenticação com Spring e JWT

## Instalação das dependencias do frontend
```
npm install
```

## Execução do backend (porta 9999)
```
spring-boot:run
```

## Execução do frontend (porta 8081)
```
npm start
```

## Inserts iniciais
```
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
```

## Criação de novos usuários com roles específicas
### POST: http://localhost:9999/api/auth/signup
### Admin
```
   {
		"username": "admin",
		"email": "admin@hotmail.com",
		"password": "123456",
		"role":["admin"]
	}
```
# Moderator
```
	{
		"username": "mod",
		"email": "mod@hotmail.com",
		"password": "123456",
		"role":["mod", "user"]
	}
```
# User
```
	{
		"username": "user",
		"email": "user@hotmail.com",
		"password": "123456",
		"role":["user"]
	}
```
