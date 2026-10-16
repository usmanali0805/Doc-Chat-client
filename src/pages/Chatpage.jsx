import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/chat/sidebar";
import ChatNavbar from "../components/chat/chatnav";
import ChatWindow from "../components/chat/chatwindow";
import { apiFetch } from "../utils/apiFetch";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const navigate = useNavigate();
  const [activeDocumentId, setActiveDocumentId] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState(null);
  const [document, setDocument] = useState({});
  const [documents, setDocuments] = useState([]);

  const activeDocument = document[activeDocumentId] || null;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // User fetch
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

  // fetch Documents
  useEffect(() => {
    async function fetchDocuments() {
      try {
        const res = await apiFetch("documents");
        if (!res?.ok) return;
        const data = await res.json();
        setDocuments(
          (data.data || []).map((doc) => ({
            id: doc.documentId,
            name: doc.filename,
            pages: doc.totalpages,
            status: doc.status,
          })),
        );
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      }
    }
    fetchDocuments();
  }, []);

  // Document Delete
  async function handleDeleteDocument(e ,docId) {
    if (!window.confirm("Yeh document delete karna hai?")) return;

    try {
      const res = await apiFetch(`documents/${docId}`, { method: "DELETE" });
      if (!res?.ok) return;

      setDocuments((prev) => prev.filter((d) => d.id !== docId));

      if (docId === activeDocumentId) {
        currentDocRef.current = null;
        setActiveDocumentId(null);
        setMessages([]);
      }
    } catch (err) {
      console.error("Failed to delete document:", err);
    }
  }

  // Ref tracker to prevent chat mixing across documents if user clicks fast
  const currentDocRef = useRef(activeDocumentId);

  function handleNewChat() {
    setMessages([]);
  }

  async function handleSelectDocument(id) {
    if (!id) return;

    currentDocRef.current = id; 
    setActiveDocumentId(id);
    setMessages([]);
    if (activeDocumentId) {
      try {
        const res = await apiFetch(`chat/${activeDocumentId}/history`, {
          method: "GET",
        });
        if (res.ok) {
          const chat = await res.json();
          setMessages(chat.messages || []);
          console.log(chat);
        }
      } catch (error) {
        console.error("Failed to fetch chat:", error);
      }
    }
  }

  async function handleDocumentUploaded(data) {
    const newDoc = {
      id: data.documentId,
      name: data.filename,
      pages: data.totalpages || 0,
      chunks: data.totalChunkes || 0,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    currentDocRef.current = newDoc.id;
    setActiveDocumentId(newDoc.id);
    setMessages([]);
  }

  async function handleSend(text) {
    if (!text.trim()) return; // Prevent sending blank messages

    if(!activeDocument){
     return alert('Please upload PDF for chatting')
    }

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
        documents={documents}
        activeDocumentId={activeDocumentId}
        onSelectDocument={handleSelectDocument}
        onNewChat={handleNewChat}
        user={user}
        setMessages={setMessages}
        setActiveDocumentId={setActiveDocumentId}
        currentDocRef={currentDocRef}
        handleDeleteDocument={handleDeleteDocument}
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
