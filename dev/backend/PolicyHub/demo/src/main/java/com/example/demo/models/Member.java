package com.example.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;

@Document(collection = "members")
public class Member {

    @Id
    private ObjectId id;
    private String name;
    private ObjectId company_id;
    private String status;
    private String member_type;

    public ObjectId getId() { return id; }
    public void setId(ObjectId id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public ObjectId getCompany_id() { return company_id; }
    public void setCompany_id(ObjectId company_id) { this.company_id = company_id; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getMember_type() { return member_type; }
    public void setMember_type(String member_type) { this.member_type = member_type; }
}