import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./ChatWindow.css";
import useUsers from "../hooks/useUsers";

export default function ChatWindow({ messages, myId, loading, selectedUser }) {
  const messagesEndRef = useRef(null);
  const {users} = useUsers()
  useEffect(() => {
    if (!loading && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  return (
    <div className="chat-messages">
      <TransitionGroup>
        {messages.map((msg, idx) => (
          <CSSTransition key={msg._id || idx} timeout={250} classNames="msg-fade">
            <MessageBubble msg={msg} users={users} myId={myId} selectedUser={selectedUser} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      <div ref={messagesEndRef} />
    </div>
  );
}