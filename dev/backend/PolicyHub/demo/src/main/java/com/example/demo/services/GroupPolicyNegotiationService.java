package com.example.demo.services;

import com.example.demo.models.GroupPolicyNegotiation;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface GroupPolicyNegotiationService {
    List<Map<String, Object>> getAllContractsWithCompanyDetails();
    ResponseEntity<Map<String, Object>> getContractByIdWithCompanyDetails(ObjectId id);
    List<GroupPolicyNegotiation> getContractsByCompanyId(ObjectId companyId);
    GroupPolicyNegotiation createContract(GroupPolicyNegotiation groupPolicyNegotiation);
    ResponseEntity<GroupPolicyNegotiation> updateContract(ObjectId id, GroupPolicyNegotiation groupPolicyNegotiation);
    void deleteContract(ObjectId id);
}
