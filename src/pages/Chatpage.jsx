import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/chat/sidebar";
import ChatNavbar from "../components/chat/chatnav";
import ChatWindow from "../components/chat/chatwindow";
import { apiFetch } from "../utils/apiFetch";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const navigate = useNavigate();
  const [activeDocumentId, setActiveDocumentId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState(null);
  const [document, setDocument] = useState({});

  const activeDocument = document[activeDocumentId] || null;

useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}auth/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        if (res.ok) setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }
    fetchUser();
  }, []);

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

  async function handleDocumentUploaded(data) {
    const newDoc = {
      id: data.documentId,
      name: data.filename,
      pages: data.totalpages || 0,
      chunks: data.totalChunkes || 0,
    };
    setDocument((prev) => ({ ...prev, [newDoc.id]: newDoc }));
    currentDocRef.current = newDoc.id;
    setActiveDocumentId(newDoc.id);
    setMessages([]);
  }

  async function handleSend(text) {
    if (!text.trim()) return; // Prevent sending blank messages
    // if (!activeDocumentId) {
    //   alert("Pehle koi PDF upload karo");
    //   return;
    // }
    // Capture the exact document ID targeted at the moment of dispatch
    const targetDocId = activeDocumentId;
    const Token = localStorage.getItem("token");
    const userMessage = {
      id: crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`,
      role: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const res = await apiFetch(`chat/${targetDocId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify({ documentId: targetDocId, question: text }),
      });
      // const res = await fetch(
      //   `${import.meta.env.VITE_API_URL}chat/${targetDocId}`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${Token}`,
      //     },
      //     body: JSON.stringify({ documentId: targetDocId, question: text }),
      //   },
      // );

      if (!res.ok) throw new Error("Server error response");
      const data = await res.json();

      // DISCARD incoming data if user switched documents while waiting
      if (currentDocRef.current !== targetDocId) return;

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID ? crypto.randomUUID() : `bot-${Date.now()}`,
          role: "assistant",
          text: data.answer,
          sources: data.sources || [],
        },
      ]);
    } catch (err) {
      if (currentDocRef.current !== targetDocId) return;

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID ? crypto.randomUUID() : `err-${Date.now()}`,
          role: "assistant",
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
        documents={document}
        activeDocumentId={activeDocumentId}
        onSelectDocument={handleSelectDocument}
        onNewChat={handleNewChat}
        user={user}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <ChatNavbar activeDocument={activeDocument} />
        <ChatWindow
          messages={messages}
          onSend={handleSend}
          isTyping={isTyping}
          onDocumentUploaded={handleDocumentUploaded}
        />
      </div>
    </div>
  );
}
