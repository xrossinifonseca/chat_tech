# Chat Tech - Backend

Este repositório contém o backend de um sistema de chat desenvolvido com Node.js, Express, Socket.IO, TypeScript e Nodemailer.


## Visão Geral

O sistema de chat permite que os usuários se conectem, enviem mensagens e participem de salas de chat em tempo real. A aplicação utiliza as seguintes tecnologias:

- **Node.js**: Ambiente de execução para JavaScript.
- **Express**: Framework web para Node.js.
- **Socket.IO**: Biblioteca para comunicação em tempo real.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática.
- **Nodemailer**: Biblioteca para envio de emails.

## Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)

### Instruções de Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/xrossinifonseca/chat_tech
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd chat_tech
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Configure as variáveis de ambiente:
    - Crie um arquivo `.env` na raiz do projeto e defina as variáveis necessárias (exemplo abaixo):
    ```env
    PORT = 
    EMAIL_HOST = 
    EMAIL_PORT = 
    EMAIL_USER = 
    EMAIL_PASS =  
    EMAIL_TO = 
    ```

### Iniciando o Servidor

Para iniciar o servidor de desenvolvimento, execute:
```bash
npm run start:dev
```
## Fluxos de Trabalho

### Cadastro de Usuário

1. **Usuário fornece um nome de usuário:**
    - O cliente (frontend) envia o nome de usuário ao servidor via evento Socket.IO `username`.
    - Exemplo:
        ```javascript
        socket.emit('username', { id: 'unique_user_id', name: 'John Doe' });
        ```
    - No backend, o evento `username` é tratado da seguinte forma:
        ```typescript
        socket.on("username", (user) => {
          socket.user_id = user.id;
          this.userRepository.save(user);
        });
        ```

2. **Sistema salva o usuário:**
    - O backend salva o usuário no repositório de usuários, associando o ID do usuário ao socket conectado.

### Entrada em uma Sala

1. **Usuário escolhe uma sala para entrar:**
    - O cliente envia o ID da sala e o ID do usuário ao servidor via evento Socket.IO `joinRoom`.
    - Exemplo:
        ```javascript
        socket.emit('joinRoom', 'room_id', 'user_id');
        ```
    - No backend, o evento `joinRoom` é tratado da seguinte forma:
        ```typescript
        socket.on("joinRoom", (roomId, userId) => {
          const joinRoom = new JoinRoom(this.roomRepository, this.userRepository);

          if (joinRoom.execute(roomId, userId)) {
            socket.join(roomId);
            socket.emit("roomMessages", this.roomRepository.findById(roomId)?.messages);
            this.io.emit("roomList", this.roomRepository.findAll());
          }
        });
        ```

2. **Sistema adiciona o usuário à sala:**
    - O backend adiciona o usuário à sala especificada e envia ao usuário a lista de mensagens existentes na sala.
    - O backend também atualiza e envia a lista de salas para todos os clientes conectados.

### Envio de Mensagem

1. **Usuário envia uma mensagem:**
    - O cliente envia a mensagem e o ID da sala ao servidor via evento Socket.IO `sendMessage`.
    - Exemplo:
        ```javascript
        socket.emit('sendMessage', { roomId: 'room_id', message: 'Hello, World!' });
        ```
    - No backend, o evento `sendMessage` é tratado da seguinte forma:
        ```typescript
        socket.on("sendMessage", ({ roomId, message }) => {
          const sendMessage = new SendMessage(this.roomRepository);

          if (sendMessage.execute(roomId, message)) {
            this.io.to(roomId).emit("newMessage", { roomId, message });
          }
        });
        ```

2. **Sistema processa e transmite a mensagem:**
    - O backend salva a mensagem na sala especificada e transmite a mensagem para todos os membros da sala.

### Desconexão do Usuário

1. **Usuário se desconecta:**
    - Quando o usuário se desconecta, o evento `disconnect` é acionado automaticamente pelo Socket.IO.
    - No backend, o evento `disconnect` é tratado da seguinte forma:
        ```typescript
        socket.on("disconnect", () => {
          if (socket.user_id) {
            const user = this.userRepository.findById(socket.user_id);

            if (user) {
              this.roomRepository.removeUserFromRooms(user.id);
              this.io.emit("roomList", this.roomRepository.findAll());
              this.userRepository.removeById(user.id);
            }
          }
        });
        ```

2. **Sistema remove o usuário:**
    - O backend remove o usuário de todas as salas em que ele estava e atualiza a lista de salas para todos os clientes conectados.

---

### Endpoint

#### POST /send-contact

- **Descrição**: Envia um email de contato utilizando o Nodemailer.
- **Corpo da Requisição**:
    ```json
    {
        "subject": "Email Subject",
        "text": "Email body text"
    }
    ```
- **Resposta**:
    ```json
    {
        "message": "Email sent successfully"
    }
    ```

---

## Contribuição

### Guia de Contribuição

1. Faça um fork do repositório.
2. Crie uma nova branch:
    ```bash
    git checkout -b minha-branch
    ```
3. Faça suas modificações e commits.
4. Envie um pull request descrevendo suas mudanças.



