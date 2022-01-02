# jwt-authentication
Implementação de autorização e autenticação com Spring e JWT

## Inserts iniciais
```
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
```

## Criação de novos usuários com roles específicas
### POST: http://localhost:9999/api/auth/signup
´´´
   {
		"username": "admin",
		"email": "admin@hotmail.com",
		"password": "123456",
		"role":["admin"]
	}
´´´
´´´
	{
		"username": "mod",
		"email": "mod@hotmail.com",
		"password": "123456",
		"role":["mod", "user"]
	}
´´´
´´´
	{
		"username": "user",
		"email": "user@hotmail.com",
		"password": "123456",
		"role":["user"]
	}
´´´
