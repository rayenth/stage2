package com.example.demo.services;

import com.example.demo.models.GroupPolicyNegotiation;
import com.example.demo.models.Company;
import com.example.demo.repositories.GroupPolicyNegotiationRepository;
import com.example.demo.repo.CompanyRepository;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GroupPolicyNegotiationServiceImpl implements GroupPolicyNegotiationService {

    private final GroupPolicyNegotiationRepository groupPolicyNegotiationRepository;
    private final CompanyRepository companyRepository;

    public GroupPolicyNegotiationServiceImpl(GroupPolicyNegotiationRepository groupPolicyNegotiationRepository, CompanyRepository companyRepository) {
        this.groupPolicyNegotiationRepository = groupPolicyNegotiationRepository;
        this.companyRepository = companyRepository;
    }

    @Override
    public List<Map<String, Object>> getAllContractsWithCompanyDetails() {
        List<GroupPolicyNegotiation> contracts = groupPolicyNegotiationRepository.findAll();
        Map<ObjectId, String> companyNameMap = companyRepository.findAll().stream()
                .collect(Collectors.toMap(Company::getId, Company::getCompanyName, (existing, replacement) -> existing));

        return contracts.stream().map(contract -> {
            Map<String, Object> contractDetails = new HashMap<>();

            // Populate details from the contract document
            contractDetails.put("id", contract.getId());
            contractDetails.put("company_id", contract.getCompany_id());
            contractDetails.put("base_policy_id", contract.getBase_policy_id());

            // Add all negotiated_terms from the flexible map
            if (contract.getNegotiated_terms() != null) {
                contractDetails.putAll(contract.getNegotiated_terms());
            }

            // Check if company_id exists before trying to access it
            String companyName = (contract.getCompany_id() != null && companyNameMap.containsKey(contract.getCompany_id())) ?
                    companyNameMap.get(contract.getCompany_id()) : "Unknown Company";

            contractDetails.put("company_name", companyName);

            return contractDetails;
        }).collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<Map<String, Object>> getContractByIdWithCompanyDetails(ObjectId id) {
        Optional<GroupPolicyNegotiation> contractOptional = groupPolicyNegotiationRepository.findById(id);
        if (!contractOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        GroupPolicyNegotiation contract = contractOptional.get();
        Optional<Company> companyOptional = companyRepository.findById(contract.getCompany_id());
        String companyName = companyOptional.isPresent() ? companyOptional.get().getCompanyName() : "Unknown Company";

        Map<String, Object> response = new HashMap<>();
        response.put("id", contract.getId());
        response.put("company_id", contract.getCompany_id());
        response.put("base_policy_id", contract.getBase_policy_id());

        // Add all negotiated_terms from the flexible map
        if (contract.getNegotiated_terms() != null) {
            response.putAll(contract.getNegotiated_terms());
        }

        response.put("company_name", companyName);

        return ResponseEntity.ok(response);
    }

    @Override
    public List<GroupPolicyNegotiation> getContractsByCompanyId(ObjectId companyId) {
        return groupPolicyNegotiationRepository.findByCompanyId(companyId);
    }

    @Override
    public GroupPolicyNegotiation createContract(GroupPolicyNegotiation groupPolicyNegotiation) {
        return groupPolicyNegotiationRepository.save(groupPolicyNegotiation);
    }

    @Override
    public ResponseEntity<GroupPolicyNegotiation> updateContract(ObjectId id, GroupPolicyNegotiation groupPolicyNegotiation) {
        if (!groupPolicyNegotiationRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        groupPolicyNegotiation.setId(id);
        return ResponseEntity.ok(groupPolicyNegotiationRepository.save(groupPolicyNegotiation));
    }

    @Override
    public void deleteContract(ObjectId id) {
        groupPolicyNegotiationRepository.deleteById(id);
    }
}
