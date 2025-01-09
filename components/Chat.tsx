import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react'; // Ikona wysyłania

interface ChatMessage {
  id: number;
  character_name: string;
  message: string;
  created_at: string; // Data w formacie ISO
  map_id: number;
  channel: string; // Kanał (mapa, grupa, klan, globalny)
}

interface ChatProps {
  mapId: number;
  characterId: number;
  characterName: string;
  mapName: string;
}

const channels = ['mapa', 'grupa', 'klan', 'globalny'];

const Chat: React.FC<ChatProps> = ({ mapId, characterId, characterName, mapName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentChannel, setCurrentChannel] = useState('mapa');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Funkcja sprawdzająca, czy wiadomość jest starsza niż 1 godzina
  const isOldMessage = (createdAt: string): boolean => {
    const messageDate = new Date(createdAt);
    const currentTime = new Date();
    const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000); // 1 godzina w milisekundach
    return messageDate < oneHourAgo;
  };

  // Usuwanie wiadomości starszych niż 6 godzin
  const filterOldMessages = (messages: ChatMessage[]) => {
    const now = new Date();
    const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);
    return messages.filter((msg) => new Date(msg.created_at) >= sixHoursAgo);
  };

  // Pobieranie wiadomości z API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/chat/${mapId}`);
        if (!response.ok) throw new Error('Błąd pobierania wiadomości');
        const data = await response.json();
        setMessages(filterOldMessages(data));
      } catch (error) {
        console.error('Nie udało się pobrać wiadomości:', error);
      }
    };
    fetchMessages();
  }, [mapId]);

  // Automatyczne przewijanie do najnowszej wiadomości
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Wysłanie wiadomości
  const sendMessage = async () => {
    if (newMessage.trim() === '') return;
    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mapId,
          characterId,
          message: newMessage,
          channel: currentChannel,
        }),
      });
      if (!response.ok) throw new Error('Błąd wysyłania wiadomości');

      const sentMessage = await response.json();
      const newMessageObj: ChatMessage = {
        id: sentMessage.id,
        character_name: characterName,
        message: newMessage,
        created_at: new Date().toISOString(),
        map_id: mapId,
        channel: currentChannel,
      };
      setMessages((prevMessages) => filterOldMessages([...prevMessages, newMessageObj]));
      setNewMessage('');
    } catch (error) {
      console.error('Nie udało się wysłać wiadomości:', error);
    }
  };

  // Zmiana mapy - komunikat systemowy
  useEffect(() => {
    const mapChangeMessage: ChatMessage = {
      id: Date.now(),
      character_name: '',
      message: `Wszedłeś na mapę ${mapName}`,
      created_at: new Date().toISOString(),
      map_id: mapId,
      channel: 'mapa',
    };
    setMessages((prevMessages) => [...prevMessages, mapChangeMessage]);
  }, [mapId, mapName]);

  // Obsługa Enter do wysyłania wiadomości
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  // Filtracja wiadomości według kanału
  const filteredMessages = messages.filter((msg) => msg.channel === currentChannel);

  return (
    <div
      className="chat-container"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '256px',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '5px',
      }}
    >
      {/* Zakładki chatu */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '5px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {channels.map((channel) => (
          <button
            key={channel}
            onClick={() => setCurrentChannel(channel)}
            style={{
              backgroundColor: currentChannel === channel ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              padding: '5px 10px',
              borderRadius: '3px',
            }}
          >
            {channel.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Wyświetlanie wiadomości */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px',
        }}
      >
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            style={{
              marginBottom: '10px',
              color: isOldMessage(msg.created_at) ? 'gray' : 'white',
            }}
          >
            <strong>{msg.character_name || 'System'}:</strong> {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Pole wpisywania wiadomości */}
      <div style={{ display: 'flex', padding: '5px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Napisz wiadomość..."
          style={{
            flex: 1,
            padding: '8px',
            fontSize: '14px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '5px 0 0 5px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '8px 12px',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '0 5px 5px 0',
            cursor: 'pointer',
          }}
        >
          <Send color="white" size={16} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
