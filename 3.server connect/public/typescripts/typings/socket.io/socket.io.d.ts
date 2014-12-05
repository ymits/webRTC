declare module 'socket.io' {
    var client:SocketIO;
    export = client;
}

interface SocketIO {
    connect(url:string): Socket;
}
interface Socket {
    on(event:string, callback:(data:any) => void);
    emit(event:string, data:any);
}