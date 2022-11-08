# OUTDATED

Instead use https://stackblitz.com/edit/sb-ws-bug?file=vite.config.ts,ReadMe.md

---

This is will print an error message to the terminal after 4 seconds
due to a StackBlitz WebSockets bug.

The output currently looks like this:

```
Attempting to connect from node chatbot with a 3000ms timeout...
timeout
CHATBOT FAILS IN STACKBLITZ DUE TO BROKEN WS SUPPORT
```

But in bare-metal Node it looks like this:

```
Attempting to connect from node chatbot with a 3000ms timeout...
Message from SB WebContainer Node.js chatbot!!!
```
