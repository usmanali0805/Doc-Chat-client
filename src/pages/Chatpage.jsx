// import { useState } from 'react';
// import Sidebar from '../components/chat/sidebar';
// import ChatNavbar from '../components/chat/chatnav';
// import ChatWindow from '../components/chat/chatwindow';

// const documentDetails = {
//   1: { id: 1, name: 'OS_Notes.pdf', pages: 18, chunks: 42 },
//   2: { id: 2, name: 'SPM_Ch4.pdf', pages: 24, chunks: 51 },
//   3: { id: 3, name: 'Thesis_draft.pdf', pages: 60, chunks: 0 },
// };

// export default function ChatPage() {
//   const [activeDocumentId, setActiveDocumentId] = useState(1);
//   const [messages, setMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);

//   const activeDocument = documentDetails[activeDocumentId];
//   const user = { name: 'Muhammad Usman', plan: 'Free plan' };

//   function handleNewChat() {
//     setMessages([]);
//   }

//   function handleSelectDocument(id) {
//     setActiveDocumentId(id);
//     setMessages([]);
//   }

//   async function handleSend(text) {
//     const userMessage = { id: Date.now(), role: 'user', text };
//     setMessages((prev) => [...prev, userMessage]);
//     setIsTyping(true);

//     try {
//       // Replace with your actual RAG query endpoint
//       const res = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ documentId: activeDocumentId, question: text }),
//       });
//       const data = await res.json();

//       setMessages((prev) => [
//         ...prev,
//         { id: Date.now() + 1, role: 'assistant', text: data.answer, sources: data.sources || [] },
//       ]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           role: 'assistant',
//           text: "Sorry, I couldn't reach the server. Please try again.",
//           sources: [],
//         },
//       ]);
//     } finally {
//       setIsTyping(false);
//     }
//   }


//   return (
//     <div className="flex h-screen bg-[var(--paper)]">
//       <Sidebar
//         activeDocumentId={activeDocumentId}
//         onSelectDocument={handleSelectDocument}
//         onNewChat={handleNewChat}
//         user={user}
//       />
//       <div className="flex-1 flex flex-col min-w-0">
//         <ChatNavbar activeDocument={activeDocument} />
//         <ChatWindow messages={messages} onSend={handleSend} isTyping={isTyping} />
//       </div>
//     </div>
//   );
// }

import { useState, useRef } from 'react';
import Sidebar from '../components/chat/sidebar';
import ChatNavbar from '../components/chat/chatnav';
import ChatWindow from '../components/chat/chatwindow';

const documentDetails = {
  1: { id: 1, name: 'OS_Notes.pdf', pages: 18, chunks: 42 },
  2: { id: 2, name: 'SPM_Ch4.pdf', pages: 24, chunks: 51 },
  3: { id: 3, name: 'Thesis_draft.pdf', pages: 60, chunks: 0 },
};

export default function ChatPage() {
  const [activeDocumentId, setActiveDocumentId] = useState(1);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Visual state anchors
  const activeDocument = documentDetails[activeDocumentId];
  const user = { name: 'Muhammad Usman', plan: 'Free plan' };

  // Ref tracker to prevent chat mixing across documents if user clicks fast
  const currentDocRef = useRef(activeDocumentId);

  function handleNewChat() {
    setMessages([]);
  }

  function handleSelectDocument(id) {
    currentDocRef.current = id; // Update track pointer
    setActiveDocumentId(id);
    setMessages([]);
  }

  async function handleSend(text) {
    if (!text.trim()) return; // Prevent sending blank messages

    // Capture the exact document ID targeted at the moment of dispatch
    const targetDocId = activeDocumentId;

    const userMessage = { 
      id: crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`, 
      role: 'user', 
      text 
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId: targetDocId, question: text }),
      });
      
      if (!res.ok) throw new Error('Server error response');
      const data = await res.json();

      // DISCARD incoming data if user switched documents while waiting
      if (currentDocRef.current !== targetDocId) return;

      setMessages((prev) => [
        ...prev,
        { 
          id: crypto.randomUUID ? crypto.randomUUID() : `bot-${Date.now()}`, 
          role: 'assistant', 
          text: data.answer, 
          sources: data.sources || [] 
        },
      ]);
    } catch (err) {
      if (currentDocRef.current !== targetDocId) return;

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID ? crypto.randomUUID() : `err-${Date.now()}`,
          role: 'assistant',
          text: "Sorry, I couldn't reach the server. Please try again.",
          sources: [],
        },
      ]);
    } finally {
      // Only lower flag if we are still looking at the original document thread
      if (currentDocRef.current === targetDocId) {
        setIsTyping(false);
      }
    }
  }

  return (
    <div className="flex h-screen bg-[var(--paper)]">
      <Sidebar
        activeDocumentId={activeDocumentId}
        onSelectDocument={handleSelectDocument}
        onNewChat={handleNewChat}
        user={user}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <ChatNavbar activeDocument={activeDocument} />
        <ChatWindow messages={messages} onSend={handleSend} isTyping={isTyping} />
      </div>
    </div>
  );
}
