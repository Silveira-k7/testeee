package com.consultoria.app.model;

import lombok.Data;

@Data
public class ChatMessage {
    private String content;
    private String sender;
    private Long requestId;
    private MessageType type;

    public enum MessageType {
        CHAT, JOIN, LEAVE
    }
}
