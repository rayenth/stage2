package com.example.demo.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "claims")
public class Claim {

    @Id
    private ObjectId id;
    private String claim_number;
    private ObjectId member_id;
    private String claim_date;
    private String status;
    private List<Service> services;

    // Nested class for the 'services' array
    public static class Service {
        private String service_type;
        private double billed_amount;

        // Getters and Setters
        public String getService_type() { return service_type; }
        public void setService_type(String service_type) { this.service_type = service_type; }
        public double getBilled_amount() { return billed_amount; }
        public void setBilled_amount(double billed_amount) { this.billed_amount = billed_amount; }
    }

    // Getters and Setters for the main Claim class
    public ObjectId getId() { return id; }
    public void setId(ObjectId id) { this.id = id; }
    public String getClaim_number() { return claim_number; }
    public void setClaim_number(String claim_number) { this.claim_number = claim_number; }
    public ObjectId getMember_id() { return member_id; }
    public void setMember_id(ObjectId member_id) { this.member_id = member_id; }
    public String getClaim_date() { return claim_date; }
    public void setClaim_date(String claim_date) { this.claim_date = claim_date; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public List<Service> getServices() { return services; }
    public void setServices(List<Service> services) { this.services = services; }
}
