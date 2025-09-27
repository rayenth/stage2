package com.example.demo.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(collection = "Group_Policy_Negotiation")
public class GroupPolicyNegotiation {

    @Id
    private ObjectId id;
    private ObjectId company_id;
    private ObjectId base_policy_id;
    private Map<String, Object> negotiated_terms;

    // Getters and Setters for the main GroupPolicyNegotiation class
    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getCompany_id() {
        return company_id;
    }

    public void setCompany_id(ObjectId company_id) {
        this.company_id = company_id;
    }

    public ObjectId getBase_policy_id() {
        return base_policy_id;
    }

    public void setBase_policy_id(ObjectId base_policy_id) {
        this.base_policy_id = base_policy_id;
    }

    public Map<String, Object> getNegotiated_terms() {
        return negotiated_terms;
    }

    public void setNegotiated_terms(Map<String, Object> negotiated_terms) {
        this.negotiated_terms = negotiated_terms;
    }
}
