package com.example.demo.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "policies")
public class Policy {

    @Id
    private ObjectId id;
    private String policy_name;
    private String description;
    private ObjectId composite_rule_id;
    private Benefits benefits;

    // Nested class for the 'benefits' object
    public static class Benefits {
        private int copay_amount;
        private int deductible_amount;
        private double coinsurance_rate;
        private boolean in_network_provider;

        // Getters and Setters
        public int getCopay_amount() {
            return copay_amount;
        }

        public void setCopay_amount(int copay_amount) {
            this.copay_amount = copay_amount;
        }

        public int getDeductible_amount() {
            return deductible_amount;
        }

        public void setDeductible_amount(int deductible_amount) {
            this.deductible_amount = deductible_amount;
        }

        public double getCoinsurance_rate() {
            return coinsurance_rate;
        }

        public void setCoinsurance_rate(double coinsurance_rate) {
            this.coinsurance_rate = coinsurance_rate;
        }

        public boolean isIn_network_provider() {
            return in_network_provider;
        }

        public void setIn_network_provider(boolean in_network_provider) {
            this.in_network_provider = in_network_provider;
        }
    }

    // Getters and Setters for the main Policy class
    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getPolicy_name() {
        return policy_name;
    }

    public void setPolicy_name(String policy_name) {
        this.policy_name = policy_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ObjectId getComposite_rule_id() {
        return composite_rule_id;
    }

    public void setComposite_rule_id(ObjectId composite_rule_id) {
        this.composite_rule_id = composite_rule_id;
    }

    public Benefits getBenefits() {
        return benefits;
    }

    public void setBenefits(Benefits benefits) {
        this.benefits = benefits;
    }
}
