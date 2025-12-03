package com.consultoria.app.model;

import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;
    private String name;

    @Enumerated(EnumType.STRING)
    private Role role; // USER, CONSULTANT

    // Profile fields
    private String profilePhotoUrl;
    private String company; // For users
    private String bio;

    public enum Role {
        USER, CONSULTANT
    }
}
