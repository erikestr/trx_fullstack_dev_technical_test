import React, { createContext, useContext, useEffect, useState } from 'react'

interface WebSocketContextType {
    subscribe: (channelName: string, callback: (message: string) => void) => void
    sendMessage: (message: string) => void
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export const useWebSocket = () => {
    const context = useContext(WebSocketContext)
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider')
    }
    return context
}

interface Props {
    url: string
}

interface Props {
  url: string
  children: React.ReactNode
}

const WebSocketProvider: React.FC<Props> = ({ url, children }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(() => {
        const newSocket = new WebSocket(url)

        newSocket.onopen = () => {
            console.log('Connected to WebSocket server')
        }

        setSocket(newSocket)

        return () => {
            newSocket.close()
        }
    }, [url])

    const subscribe: WebSocketContextType['subscribe'] = (channelName, callback) => {
        if (socket) {
            socket.addEventListener('message', (event) => {
                const message = event.data
                callback(message)
            })
        }
    }

    const sendMessage: WebSocketContextType['sendMessage'] = (message) => {
        if (socket) {
            socket.send(message)
        }
    }

    const contextValue: WebSocketContextType = {
        subscribe,
        sendMessage,
    }

    return (
        <WebSocketContext.Provider value={contextValue}>
            {children}
        </WebSocketContext.Provider>
    )
}

export default WebSocketProvider
